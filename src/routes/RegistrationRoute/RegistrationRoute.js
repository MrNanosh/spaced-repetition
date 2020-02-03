import '../../components/RegistrationForm/RegistrationForm';
import React, {
  Component
} from 'react';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';

class RegistrationRoute extends Component {
  static defaultProps = {
    history: {
      push: () => {}
    }
  };

  handleRegistrationSuccess = () => {
    const { history } = this.props;
    history.push('/login');
  };

  render() {
    return (
      <section className="RegistrationForm__section">
        <p className="RegistrationForm__tagLine">
          Practice learning a language
          with the spaced reptition
          revision technique.
        </p>
        <h2 className="RegistrationForm__header">
          Sign up
        </h2>
        <RegistrationForm
          onRegistrationSuccess={
            this
              .handleRegistrationSuccess
          }
        />
      </section>
    );
  }
}

export default RegistrationRoute;
