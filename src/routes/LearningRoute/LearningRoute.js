import React, {
  Component
} from 'react';
import config from '../../config';
import { JsonWebTokenError } from 'jsonwebtoken';
import TokenService from '../../services/token-service';

class LearningRoute extends Component {
  constructor(props) {
    super(props);
    //this will be the parent with the state
    this.state = {
      nextWord: '',
      wordCorrectCount: 0,
      wordIncorrectCount: 0,
      totalScore: 0,
      error: null,
      hasError: false
    };
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

  render() {
    const {
      nextWord,
      totalScore,
      wordCorrectCount,
      wordIncorrectCount
    } = this.state;
    return (
      <section className="Learn">
        <p>
          Your total score is:{' '}
          {totalScore}
        </p>
        <h2>Translate the word:</h2>
        <span>{nextWord}</span>
        <form>
          <label htmlFor="learn-guess-input">
            What's the translation for
            this word?
          </label>
          <input
            id="learn-guess-input"
            type="text"
            required
          />
          <button type="submit">
            Submit your answer
          </button>
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
        {/* form component that allows
        user to submit answer */}
      </section>
    );
  }
}

export default LearningRoute;
