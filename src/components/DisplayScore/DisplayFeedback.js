import React, {
  useContext
} from 'react';
import LearningContext from '../../contexts/LearningContext';
import Button from '../Button/Button';
import { LearnButton } from '../LearnButton/LearnButton';

const DisplayFeedback = () => {
  const {
    guess,
    answer,
    nextWord,
    isCorrect
  } = useContext(LearningContext);

  let userFeedback;
  if (isCorrect) {
    userFeedback = (
      <React.Fragment>
        <h2>You were correct! :D</h2>{' '}
        <br />
        <p></p>
      </React.Fragment>
    );
  } else if (isCorrect === false) {
    userFeedback = (
      <>
        <h2>
          Good try, but not quite right
          :(
        </h2>
        <p>
          The correct translation for{' '}
          {nextWord} was {answer} and
          you chose {guess}!
        </p>
      </>
    );
  } else {
    userFeedback = (
      <>
        <h2>Translate the word:</h2>
        <span>{nextWord}</span>
      </>
    );
  }
  return (
    <div className="DisplayFeedback">
      {userFeedback}
    </div>
  );
};

export default DisplayFeedback;
