import React, {
  Component
} from 'react';

const LearningContext = React.createContext(
  {
    totalScore: null,
    guess: '',
    answer: '',
    nextWord: '',
    isCorrect: null,
    hasSubmitted: null,
    wordCorrectCount: 0,
    wordIncorrectCount: 0
  }
);
export default LearningContext;
