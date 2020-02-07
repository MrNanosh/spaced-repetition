import React, {
  Component
} from 'react';
import config from '../../config';
import TokenService from '../../services/token-service';
import Button from '../../components/Button/Button';
import LearningContext from '../../contexts/LearningContext';
import DisplayScore from '../../components/DisplayScore/DisplayScore';
import DisplayFeedback from '../../components/DisplayScore/DisplayFeedback';
import { LearnButton } from '../../components/LearnButton/LearnButton';

class LearningRoute extends Component {
  constructor(props) {
    super(props);
    //this will be the parent with the state
    this.state = {
      nextWord: '',
      wordCorrectCount: 0,
      wordIncorrectCount: 0,
      totalScore: 0,
      userInput: '',
      error: null,
      hasError: false,
      hasSubmitted: false,
      isCorrect: null,
      guess: null,
      answer: '',
      next: {
        wordCorrectCount: 0,
        wordIncorrectCount: 0,
        nextWord: ''
      }
    };
    this.handleSubmit = this.handleSubmit.bind(
      this
    );
    this.handleChange = this.handleChange.bind(
      this
    );
  }

  componentWillMount() {
    this.getHead();
  }

  async getHead() {
    try {
      const options = {
        headers: {
          Authorization: `bearer ${TokenService.getAuthToken()}`
        }
      };
      let response = await fetch(
        config.API_ENDPOINT +
          '/language/head',
        options
      );
      let rspJson = await response.json();
      if (!response.ok) {
        throw new Error(rspJson);
      }

      await this.setState({
        ...this.state,
        ...rspJson
      });
    } catch (error) {
      this.setState({
        ...this.state,
        error,
        hasError: true
      });
    }
  }

  handleChange(e) {
    this.setState({
      userInput: e.target.value
    });
  }

  //POST user response
  async handleSubmit(e) {
    e.preventDefault();
    if (this.state.hasSubmitted) {
      return null;
    } else {
      try {
        let response = await fetch(
          config.API_ENDPOINT +
            '/language/guess',
          {
            method: 'POST',
            body: JSON.stringify({
              guess: this.state
                .userInput
            }),
            headers: {
              'content-type':
                'application/json',
              Authorization: `bearer ${TokenService.getAuthToken()}`
            }
          }
        );
        let rspJson = await response.json();

        if (!response.ok) {
          throw new Error(rspJson);
        }
        let {
          totalScore,
          wordCorrectCount,
          wordIncorrectCount,
          nextWord,
          isCorrect,
          answer
        } = rspJson;
        this.setState({
          hasSubmitted: true,
          totalScore,
          isCorrect,
          guess: this.state.userInput,
          answer,
          wordCorrectCount: isCorrect
            ? ++this.state
                .wordCorrectCount
            : this.state
                .wordCorrectCount,
          wordIncorrectCount: isCorrect
            ? this.state
                .wordIncorrectCount
            : ++this.state
                .wordIncorrectCount,
          next: {
            nextWord,
            wordCorrectCount,
            wordIncorrectCount
          }
        });
      } catch (error) {
        this.setState({
          ...this.setState,
          error: error.error,
          hasError: true
        });
      }
    }
  }

  render() {
    const {
      nextWord,
      totalScore,
      wordCorrectCount,
      wordIncorrectCount,
      hasSubmitted,
      isCorrect,
      guess,
      answer,
      userInput
    } = this.state;

    let userFeedback = null;

    return (
      <LearningContext.Provider
        value={{
          nextWord,
          totalScore,
          wordCorrectCount,
          wordIncorrectCount,
          hasSubmitted,
          isCorrect,
          guess,
          answer,
          handleChangeInput: this
            .handleChange,
          userInput
        }}
      >
        <section className="Learn">
          <DisplayScore></DisplayScore>
          <DisplayFeedback></DisplayFeedback>
          <form
            onSubmit={this.handleSubmit}
          >
            <LearnButton
              hasSubmitted={
                hasSubmitted
              }
            ></LearnButton>
          </form>
          <p>
            {' '}
            You have answered this word
            correctly {
              wordCorrectCount
            }{' '}
            times.
          </p>
          <p>
            {' '}
            You have answered this word
            incorrectly{' '}
            {wordIncorrectCount} times.
          </p>
        </section>
      </LearningContext.Provider>
    );
  }
}

export default LearningRoute;
