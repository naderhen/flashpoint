import React from "react";
import styles from "./style.css";
import Request from 'superagent';

export default class LoginPage extends React.Component {
  componentDidMount() {
  	Request
		.get('/forecast')
		.query({ lat: 37.8267, lng: -122.423 })
		.set('Accept', 'application/json')
		.end(function(err, res){
		    console.log(res.body)
		});
  }

  render() {
    return (
      <div className={styles.content}>
        <h1 className={styles.heading}>Login Page</h1>
        <p className={styles.lead}>Create an account to get started!</p>
        <button className={styles.signUpButton} onClick={this.signUp}>Sign up</button>
      </div>
    );
  }
}
