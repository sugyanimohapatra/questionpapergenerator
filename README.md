# Question Paper Generator

A Node.js application to generate question papers based on a set of predefined criteria.

## Introduction

The Question Paper Generator is a Node.js application that allows users to generate question papers by specifying criteria such as total marks, difficulty distribution, and more. The application stores questions in a Question Store with attributes such as question, subject, topic, difficulty, and marks.

## Features

- **Modular Design:** The code is designed to be modular and extensible, following best practices and community conventions.
- **Scalability:** The application is built to scale with new requirements. It can easily accommodate future features, such as specifying the percentages of questions from each topic in the question paper.
- **Error Handling:** Edge cases are handled gracefully, and the application fails gracefully when encountering unexpected scenarios.

## Setup

To set up the Question Paper Generator on your local machine, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/sugyanimohapatra/question-paper-generator.git
   cd question-paper-generator

Install dependencies:
npm install
Start the application:
npm start

Making HTTP Requests with Thunder Client

Example configuration:

#javascript

module.exports = {
  totalMarks: 100,
  difficultyDistribution: {
    easy: 0.2,
    medium: 0.5,
    hard: 0.3,
  },
};
