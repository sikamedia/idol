import React, {Component} from 'react'
import styles from '../../public/style.css'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as UIAction from '../actions/UIAction'
import * as FetchParticipantAction from '../actions/FetchParticipantAction'
import * as VideoAction from '../actions/VideoAction'
//http://api.tv4play.se/play/video_assets.json?tags=ludvig-turner&page=4

export class ParticipantDetails extends Component {

	constructor(props) {
		super(props);
		this.renderBackButton = this.renderBackButton.bind(this);
		this.goBackToMain = this.goBackToMain.bind(this);

		this.state = {
			name: "",
			video_assets: [],
			video_hits: 0,
			which_page: 0
		}
	}

	componentWillMount() {

		/*

		fetch("http://api.tv4play.se/play/video_assets.json?tags=ludvig-turner&page=4").then(function (response) {
			return response.json()
		}).then((json) => {
			//console.log('parsed json', json)
			this.setState({video_hits: json.total_hits});
		}).catch((ex) => {
			console.log('parsing failed', ex)
		}) */

	}


	render() {
		return (
			<div className={styles.container}>
				{this.renderBackButton()}
				<ParticipantInfo name={this.props.selectedParticipantName}
								 imageUrl={this.props.selectedParticipantImageUrl}
								 description={this.props.selectedParticipantDescription}
				/>
				<ParticipantVideos totalHits={this.props.videoAssets.total_hits}/>

			</div>

		);

	}

	goBackToMain  = event => {
		this.props.actions.setShowParticipant();
	}

	renderBackButton() {
		return (
			<div className={styles.top}>
				<h1 onClick={this.goBackToMain} style={{textDecoration: 'underline'}}>Back</h1>
			</div>
		);
	}

}

ParticipantDetails.propTypes = {
	actions: React.PropTypes.shape({
		setShowParticipant: React.PropTypes.func
	})
};

const mapStateToProps = (state) => {

	return {
		selectedParticipantTag: state.FetchParticipantReducer.selectedParticipantTag,
		selectedParticipantName: state.FetchParticipantReducer.selectedParticipantName,
		selectedParticipantDescription: state.FetchParticipantReducer.selectedParticipantDescription,
		selectedParticipantImageUrl: state.FetchParticipantReducer.selectedParticipantImageUrl,
		videoAssets: state.VideoReducer.videoAssets
	}
}

const mapDispatchToProps = (dispatch) => {
	return { actions: bindActionCreators({...UIAction, ...FetchParticipantAction, ...VideoAction}, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantDetails)



class ParticipantInfo extends Component {

	constructor(props) {
		super(props);
		this.convertTextArray = this.convertTextArray.bind(this);
		this.renderDescription = this.renderDescription.bind(this);
	}

	render() {

		return (
			<div className={styles.left}>
				<ul>
					<div className={styles.withBgSize} style={{backgroundImage: `url(${this.props.imageUrl})`}}></div>
					<div> <h3 style={{textAlign: 'left'}}> {this.props.name} </h3> </div>
					<div> {this.convertTextArray(this.props.description).map(this.renderDescription)}</div>
				</ul>
			</div>

		);
	}

	renderDescription = (text) => {
		return (<h6>{text}</h6>);
	}

	convertTextArray = (texts) => {
		let textArray = texts.split('\r\n\r');
		return textArray;
	}


}

class ParticipantVideos extends Component {

	constructor(props) {
		super(props);
	}


	render() {

		return (
			<div className={styles.right}>
				<p>{this.props.totalHits}</p>
			</div>

		);
	}

}
