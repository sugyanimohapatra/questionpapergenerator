// index.js
const express = require('express');
const fs = require('fs/promises');
const app = express();
const PORT = 3000;

app.use(express.json());

// Read questions from the JSON file
const questionsFilePath = './question.json';

async function getQuestions() {
  try {
    const data = await fs.readFile(questionsFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading questions from JSON file:', error);
    return [];
  }
}

// Generate question paper route
app.post('/generate-paper', async (req, res) => {
  try {
    const { totalMarks } = req.body;

    // Logic to fetch questions based on the distribution of marks
    const questionPaper = await generateQuestionPaper(totalMarks);

    res.json({ questionPaper });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Logic to generate question paper
// Logic to generate question paper
async function generateQuestionPaper(totalMarks) {
    const questions = await getQuestions();
    const questionPaper = [];
    let remainingMarks = totalMarks;
  
    // Calculate the target number of questions for each difficulty level
    const easyPercentage = 0.2; // 20%
    const mediumPercentage = 0.5; // 50%
    const hardPercentage = 0.3; // 30%
  
    const calculateCount = (percentage, totalMarks) => Math.floor(totalMarks * percentage);
  
    const easyCount = calculateCount(easyPercentage, totalMarks);
    const mediumCount = calculateCount(mediumPercentage, totalMarks);
    const hardCount = calculateCount(hardPercentage, totalMarks);
  
    for (const difficulty of ['easy', 'medium', 'hard']) {
      const filteredQuestions = questions.filter(q => q.difficulty === difficulty);
      const count = difficulty === 'easy' ? easyCount : (difficulty === 'medium' ? mediumCount : hardCount);
  
      // Ensure we have enough questions of the current difficulty
      if (count <= filteredQuestions.length) {
        questionPaper.push(...filteredQuestions.slice(0, count));
        remainingMarks -= filteredQuestions.slice(0, count).reduce((acc, q) => acc + q.marks, 0);
      }
    }
  
    // Add additional questions randomly if needed to meet the total marks
    while (remainingMarks > 0) {
      const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
      if (randomQuestion.marks <= remainingMarks) {
        questionPaper.push(randomQuestion);
        remainingMarks -= randomQuestion.marks;
      }
    }
  
    return questionPaper;
  }
  
  
  
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
