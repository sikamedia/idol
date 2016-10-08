import React, {Component} from 'react'
//import {participants} from './mock'
import styles from '../../public/style.css'
import 'whatwg-fetch'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as UIAction from '../actions/UIAction'
import * as FetchParticipantAction from '../actions/FetchParticipantAction'
import * as VideoAction from '../actions/VideoAction'

class ParticipantList extends Component {


	constructor(props) {
		super(props);
		this.onItemClicked = this.onItemClicked.bind(this);
		this.renderParticipant = this.renderParticipant.bind(this);
		//this.calculateTotalPageNumbers = this.calculateTotalPageNumbers.bind(this);
	}

	componentWillMount() {

		this.props.actions.request();

	}

	onItemClicked = item => event => {


		this.props.actions.setShowParticipant();
		this.props.actions.videoAssetsRequest(item.person_tag);
		this.props.actions.selectParticipant(item.person_tag, item.name, item.description, item.image.url);



		/*
		fetch("http://api.tv4play.se/play/video_assets.json?tags=ludvig-turner").then(function (response) {
			return response.json()
		}).then((json) => {
			console.log('parsed json', json.total_hits);
			console.log('pages: ', this.calculateTotalPageNumbers(json.total_hits , 12));

		}).catch((ex) => {
			console.log('parsing failed', ex)
		})*/



	}

	//need an unit test
	calculateTotalPageNumbers = (total_hits, numbers_per_page) => {
		return Math.ceil(total_hits / numbers_per_page);
	}



	renderParticipant(item) {
		return (
			<li onClick={this.onItemClicked(item)} className={styles.item} key={item.person_tag}>
				<div className={styles.withBgSize} style={{backgroundImage: `url(${item.image.url})`}}></div>
				<div className={styles.center}> {item.name} </div>
			</li>

		);
	}


	render() {

		return (
			<ul className={styles.container}>
				{
					this.props.participants.map(this.renderParticipant)
				}
			</ul>
		);
	}

}

//react proptypes
ParticipantList.propTypes = {
	actions: React.PropTypes.shape({
		setShowParticipant: React.PropTypes.func,
		request: React.PropTypes.func,
		selectParticipant: React.PropTypes.func,
		videoAssetsRequest: React.PropTypes.func
	})
};

function mapDispatchToProps(dispatch) {
	return { actions: bindActionCreators({...UIAction, ...FetchParticipantAction, ...VideoAction}, dispatch) }
}

const mapStateToProps = (state) => {

	return {
		participants: state.FetchParticipantReducer.participants,
		selectedParticipantTag: state.FetchParticipantReducer.selectedParticipantTag,
		videoAssets: state.VideoReducer.videoAssets
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantList)