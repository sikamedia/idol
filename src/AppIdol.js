import React, {Component} from 'react'
import {connect} from 'react-redux'

import ParticipantList from './components/ParticipantList'
import ParticipantDetails from './components/ParticipantDetails'




const apiURL = "http://api.tv4play.se";


class AppIdol extends Component {
	render() {
		return (
			<div>
				{(this.props.showList) ?  <ParticipantList api={apiURL}/> : <ParticipantDetails/>}
			</div>

		);
	}
}

const mapStateToProps = (state) => {
	return {
		showList: state.UIReducer.show
	}
}

export default connect(mapStateToProps)(AppIdol)
//export connect(mapStateToProps)(ParticipantDetails)
