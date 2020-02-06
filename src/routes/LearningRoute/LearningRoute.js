import React, {
  Component
} from 'react';
import config from '../../config';
import TokenService from '../../services/token-service';
import Button from '../../components/Button/Button';
import LearningContext from '../../contexts/LearningContext';
import DisplayScore from '../../components/DisplayScore/DisplayScore';

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
      answer
    } = this.state;

    let userFeedback = null;

    if (isCorrect) {
      userFeedback = (
        <React.Fragment>
          <h2>
            Congratulations! You are
            correct!
          </h2>{' '}
          <br />
          <Button
            className="Learn__button"
            type="button"
          >
            Next Word
          </Button>
        </React.Fragment>
      );
    } else if (isCorrect === false) {
      userFeedback = (
        <>
          <h2>
            Sorry, the correct answer is{' '}
            {answer}
          </h2>
          <Button
            className="Learn__button"
            type="button"
          >
            Next Word
          </Button>
        </>
      );
    } else {
      userFeedback = null;
    }

    return (
      <LearningContext.Provider
        value={{
          totalScore: totalScore
        }}
      >
        <section className="Learn">
          <DisplayScore></DisplayScore>
          <h2>Translate the word:</h2>
          <span>{nextWord}</span>
          <form
            onSubmit={this.handleSubmit}
          >
            <label htmlFor="learn-guess-input">
              What's the translation for
              this word?
            </label>
            <input
              id="learn-guess-input"
              type="text"
              value={
                this.state.userInput
              }
              onChange={
                this.handleChange
              }
              required
            />
            <Button
              type="submit"
              disabled={
                hasSubmitted
                  ? true
                  : false
              }
            >
              Submit your answer
            </Button>
          </form>
          <div className="answer-feedback">
            {userFeedback}
          </div>
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
