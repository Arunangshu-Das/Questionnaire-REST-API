const express = require("express");
const Test = require("../model/test");
const UserResponse = require("../model/userResponse");
const router = express.Router();


const compareArrays = (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b);
};

// Submit test endpoint
router.post("/submit-test", async (req, res) => {
  try {
    const { userId, testId, responses } = req.body;

    // Check if the user has already taken the test
    const existingResponse = await UserResponse.findOne({ userId, testId });
    if (existingResponse) {
      return res.status(400).json({
        success: false,
        message: "User has already taken this test",
      });
    }

    // Get the test from the database
    const test = await Test.findById(testId);
    if (!test) {
      return res.status(404).json({
        success: false,
        message: "Test not found",
      });
    }

    // Calculate the score based on the user's responses
    let score = 0;
    for (const response of responses) {
      const question = test.questions.find(
        (q) => q.questionId.toString() === response.questionId
      );
      if (!question) {
        continue;
      }
      else
      {
        // console.log(question["answers"]);
        // console.log(response.selectedAnswers);
        // console.log(compareArrays(question["answers"] ,response.selectedAnswers));
        if (compareArrays(question["answers"], response.selectedAnswers)) {
          score++;
        }
      }
    }

    // Save the user's response in the database
    const userResponse = new UserResponse({
      userId,
      testId,
      responses,
      score,
    });
    await userResponse.save();

    // Return the response to the user
    res.status(200).json({
      success: true,
      userId,
      testId,
      score,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

module.exports = router;
