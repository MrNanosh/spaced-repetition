import React, {
  useContext
} from 'react';
import LearningContext from '../../contexts/LearningContext';

const DisplayScore = () => {
  const { totalScore } = useContext(
    LearningContext
  );
  return (
    <div className="DisplayScore">
      <p>
        Your total score is:{' '}
        {totalScore}
      </p>
    </div>
  );
};

export default DisplayScore;
