import React, { Component } from 'react';
import config from '../../config';
import TokenService from '../../services/token-service';
import Button from '../components/Button';

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
      hasError: false
    };
    this.onSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.getHead();
  }
  componentDidMount() {
    this.handleSubmit();
  }

  async getHead() {
    try {
      const options = {
        headers: {
          Authorization: `bearer ${TokenService.getAuthToken()}`
        }
      };
      let response = await fetch(
        config.API_ENDPOINT + '/language/head',
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
    this.setState({ userInput: e.target.userInput });
  }
  //POST user response
  handleSubmit(e) {
    e.preventDefault()
    const input = {
      req: {
        body: this.state.userInput
      }
    };

    fetch(config.API_ENDPOINT + '/language/guess', {
      method: 'POST',
      body: JSON.stringify(input),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => res.json())
      .then(response => console.log('Success:', JSON.stringify(response)))
      .catch(error => console.error('Error:', error));
  }

  render() {
    const {
      nextWord,
      totalScore,
      wordCorrectCount,
      wordIncorrectCount
    } = this.state;

    let userFeedback;

    if (this.state.userInput === res.answer) {
      userFeedback = (
        <React.Fragment>
        <h2>Congratulations! You are correct!</h2> <br/>
        <Button>Next Word</Button>
        </React.Fragment>
        )
    } else {
      userFeedback =
        (
          <h2>Sorry, the correct answer is {res.answer}</h2>
          )
    }

    return (
      <section className="Learn">
        <p>
          Your total score is:{' '}
          {totalScore}
        </p>
        <h2>Translate the word:</h2>
        <span>{nextWord}</span>
        <form onSubmit={this.handleSubmit} >
          <label htmlFor="learn-guess-input">
            What's the translation for
            this word?
          </label>
          <input
            id="learn-guess-input"
            type="text"
            value={this.state.userInput}
            onChange={this.handleChange}
            required
          />
          <button type="submit">
            Submit your answer
          </button>
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
    );
  }
}

export default LearningRoute;
