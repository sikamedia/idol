import React, {Component} from 'react'
import {connect} from 'react-redux'

import ParticipantList from './components/ParticipantList'
import ParticipantDetails from './components/ParticipantDetails'
import FacebookButton from 'components/facebook/FacebookButton'

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
					{(this.props.showList) ?  <ParticipantList api={apiURL} /> : <ParticipantDetails/>}
				</div>
			</div>

		);
	}
}

const mapStateToProps = (state) => {
	return {
		showList: state.UIReducer.show
	}
}

export default connect(mapStateToProps)(AppIdol);
