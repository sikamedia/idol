import React, {Component} from "react";
import {connect} from "react-redux";
import FacebookButton from "sfacebook/FacebookButton";

const apiURL = "http://api.tv4play.se";

class AppIdol extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<FacebookButton />
				<div>
					{this.props.children}
				</div>
			</div>

		);
	}
}

AppIdol.propTypes = {
	children: React.PropTypes.element.isRequired
}

export default connect()(AppIdol);
