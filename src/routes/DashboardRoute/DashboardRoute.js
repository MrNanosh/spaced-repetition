import React, {
  Component
} from 'react';
//import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';
import './DashboardRoute.scss';
import config from '../../config';
import TokenService from '../../services/token-service';

class DashboardRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: {
        id: 0,
        name: '',
        user_id: 0,
        total_score: 0
      },
      words: [
        {
          id: 0,
          language_id: 0,
          original: '',
          correct_count: 0,
          incorrect_count: 0
        }
      ],
      error: null,
      hasError: false
    };
  }

  componentWillMount() {
    fetch(
      config.API_ENDPOINT + '/language',
      {
        headers: {
          Authorization: `bearer ${TokenService.getAuthToken()}`
        }
      }
    )
      .then(rsp => {
        if (!rsp.ok) {
          rsp
            .json()
            .then(e =>
              Promise().reject(e)
            );
        } else {
          return rsp.json();
        }
      })
      .then(json => {
        this.setState({
          ...this.state,
          words: json.words,
          language: json.language
        });
      })
      .catch(e => console.log(e));
  }
  makeWordList() {
    return this.state.words.map(
      word => {
        return (
          <li className="Dashboard__word">
            <h4>{word.original}</h4>
            correct answer count:{' '}
            {word.correct_count}
            <br />
            incorrect answer count:{' '}
            {word.incorrect_count}
            <br />
          </li>
        );
      }
    );
  }
  render() {
    const { language } = this.state;

    return (
      <section className="Dashboard">
        <h2 className="Dashboard__title">
          {language.name}
        </h2>
        Total correct answers:{' '}
        {language.total_score}
        <h3 className="Dashboard__subtitle">
          Words to practice
        </h3>
        <ul className="Dashboard__wordList">
          {this.makeWordList()}
        </ul>
        <Link
          className="Dashboard__link"
          to="/learn"
        >
          Start practicing
        </Link>
      </section>
    );
  }
}

export default DashboardRoute;
