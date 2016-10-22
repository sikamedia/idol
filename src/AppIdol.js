import React, {Component} from "react";
import {connect} from "react-redux";
import FacebookButton from "components/facebook/FacebookButton";

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
	children: React.PropTypes.object
}

const mapStateToProps = (state) => {
	return {
		showList: state.UIReducer.show,
		selectedParticipantTag: state.FetchParticipantReducer.selectedParticipantTag
	}
}

export default connect(mapStateToProps)(AppIdol);
