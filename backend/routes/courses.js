const express = require("express");
const router = express.Router();

const userModel = require("../models/user");
const {
  topicsModel,
  lessonSchema,
  topicLessonSchema,
  topicsSchema,
} = require("../models/topics");

router.post("/getModules", async (req, res) => {
  const { courses } = req.body;

  try {
    // Handle cases where courses is not an array
    if (!Array.isArray(courses)) {
      return res
        .status(400)
        .json({ message: "Invalid courses data. Must be an array." });
    }

    // Efficiently filter topics using aggregation framework:
    const topics = await topicsModel.aggregate([
      {
        $match: {
          $or: [
            { sourceKey: { $nin: courses } }, // Exclude topics not in courses (userNotStarted)
            { sourceKey: { $in: courses } }, // Include topics in courses (userInProgress)
          ],
        },
      },
    ]);

    const userInProgress = topics.filter((topic) =>
      courses.includes(topic.sourceKey)
    ); // Filter topics in progress
    const userNotStarted = topics.filter(
      (topic) => !courses.includes(topic.sourceKey)
    ); // Filter topics not started

    res.json({ userInProgress, userNotStarted }); // Send categorized topics
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching topics" });
  }
});

router.post("/updateCourse", async (req, res) => {
  const { userId } = req.body;
  const { courseToAdd } = req.body; // Replace 'courseToAdd' with actual data structure

  try {
    // Find the user by ID
    const user = await userModel.findByIdAndUpdate(userId, {
      $push: { courses: courseToAdd }, // Use $push to append to the array
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Course appended successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error appending course" });
  }
});

router.post("/updateTopics", async (req, res) => {
  const { sourceKey, lessonTitleArr, topic } = req.body;

  // Validate input (optional but recommended)
  if (!sourceKey || !lessonTitleArr || !topic) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const lessonArr = lessonTitleArr.map((lessonTitleStr) => ({
    lessonTitle: lessonTitleStr,
    lessonBody: "No lesson body",
  })); // Create an array of lesson objects

  try {
    const updatedTopic = await topicsModel.findOne({ sourceKey });

    const topicLessonAppend = {
      topic,
      lessons: lessonArr,
    };

    updatedTopic.topicLesson.push(topicLessonAppend); // Append to the topicLesson array

    await updatedTopic.save(); // Save the updated topic

    if (!updatedTopic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    res.json({ message: "Topic lessons updated successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating topic lessons" });
  }
});

module.exports = router;
