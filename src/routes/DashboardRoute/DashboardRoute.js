import React, { Component } from 'react'
//import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';

class DashboardRoute extends Component {
  constructor(props){
    super(props);
      this.state = {
      
    }
  }


  render() {
    return (
      <section>
        <h2>Spanish</h2>

        <p>Total correct answers: 0</p>

        <h3>Words To Practice</h3>
        <ul>
        <li><h4>hola</h4>correct answer count: {/*{word.correct_count}*/}incorrect answer count: {/*{word.incorrect_count}*/}</li>
        </ul>

        <Link to="/learn">Start Practicing</Link>
      
      </section>
    );
  }
}

export default DashboardRoute;
