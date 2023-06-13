require("./config/database").connect();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./model/user");
const testController = require("./controller/testController");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to authenticate the JWT token
const authenticateToken = (req, res, next) => {
  const authToken = req.headers.authorization;
  if (!authToken) {
    return res.status(401).json({
      success: false,
      message: "Authorization token missing",
    });
  }

  try {
    const token = authToken.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid authorization token",
    });
  }
};

// Welcome API endpoint
app.get("/api/welcome", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API successfully called",
  });
});

// User signup endpoint
app.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password, phone_number } = req.body;

    if (!(name && email && password)) {
      return res.status(400).json({
        success: false,
        message: "All fields are mandatory",
      });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone_number,
    });


    res.status(200).json({
      success: true,
      message: "Signed up successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// User login endpoint
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({ user: { id: user._id } }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      authToken: token,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// Edit phone number endpoint
app.put("/api/edit/phonenumber", authenticateToken, async (req, res) => {
  try {
    const { phone_number } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.phone_number = phone_number;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Phone number changed / added successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

app.use("/", testController);

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Server running on port", process.env.PORT);
  }
});
