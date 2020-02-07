// @flow
import * as React from 'react';
import Button from '../Button/Button';
import LearningContext from '../../contexts/LearningContext';
export const LearnButton = props => {
  let butt;
  const {
    userInput,
    handleChangeInput
  } = React.useContext(LearningContext);
  if (props.hasSubmitted) {
    butt = (
      <Button
        id="next-button"
        className="Learn__button"
        type="button"
      >
        Try another word!
      </Button>
    );
  } else {
    butt = (
      <>
        <label htmlFor="learn-guess-input">
          What's the translation for
          this word?
        </label>
        <input
          id="learn-guess-input"
          type="text"
          value={userInput}
          onChange={handleChangeInput}
          required
        />
        <Button
          id="submit-button"
          type="submit"
        >
          Submit your answer
        </Button>
      </>
    );
  }
  return <>{butt} </>;
};
