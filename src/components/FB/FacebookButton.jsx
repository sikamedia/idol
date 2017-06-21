import React, {Component} from "react";

export default class FacebookButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };

    this.onLogout = this.onLogout.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);

  }

  componentDidMount() {

    console.log('My name is....');

    FB.getLoginStatus((response) => {
      if (response.status === 'connected') {
        console.log("FB login" + response);
        FB.api('/me', (response) => {
          let message = "Welcome " + response.name;
          this.setState({
            message: message
          });
        });
      }
    });
  }


  onLogout = (response) => {
    this.setState({message: ""});
  }

  onStatusChange = (response) => {

    if (response.status === 'connected') {

      FB.api('/me', (response) => {
        let message = "Welcome " + response.name;
        this.setState({
          message: message
        });
      });
    }
  }

  render() {
    return (
      <div>
        <div className="fb-login-butXXton" data-max-rows="1" data-size="medium" data-show-faces="false"
             data-auto-logout-link="true"></div>
        <div>{this.state.message}</div>
      </div>

    );

  }


}
