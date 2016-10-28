import React, {Component, PropTypes} from "react";
import styles from "../../public/style.css";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as UIAction from "../actions/UIAction";
import * as FetchParticipantAction from "../actions/FetchParticipantAction";
import * as VideoAction from "../actions/VideoAction";
import * as PaginationAction from "../actions/PaginationAction";
import {Link} from "react-router";
import ParticipantInfo from "components/ParticipantInfo";


export class ParticipantDetails extends Component {

	constructor(props) {
		super(props);
		this.renderBackButton = this.renderBackButton.bind(this);
		this.goBackToMain = this.goBackToMain.bind(this);
	}

	componentWillMount() {
		console.log("ParticipantDetails", this.props.nameTag, this.props.currentPage);
		this.props.actions.videoAssetsRequest(this.props.nameTag, this.props.currentPage)
	}

	render() {
		return (
			<div className={styles.container}>
				{this.renderBackButton()}
				<ParticipantInfo name={this.props.selectedParticipantName}
								 imageUrl={this.props.selectedParticipantImageUrl}
								 description={this.props.selectedParticipantDescription}
				/>
				<ParticipantVideos totalPages={Math.ceil(this.props.videoAssets.total_hits / 12)}
								   totalHits={this.props.videoAssets.total_hits}
								   results={this.props.videoAssets.results}
								   goPage={this.props.actions.goPage}
								   currentPage={this.props.currentPage}/>
			</div>

		);

	}

	goBackToMain = event => {
		this.props.actions.setShowParticipant();
	}

	renderBackButton() {
		return (
			<Link name="Tao" to="/">
				<div className={styles.top}>
					<h1 onClick={this.goBackToMain} style={{
						textDecoration: 'underline',
						cursor: 'pointer', cursor: 'hand'
					}}>Back</h1>
				</div>
			</Link>
		);
	}

}

ParticipantDetails.propTypes = {
	actions: React.PropTypes.shape({
		setShowParticipant: React.PropTypes.func,
		videoAssetsRequest: React.PropTypes.func,
		prePage: React.PropTypes.func,
		nextPage: React.PropTypes.func,
		goPage: React.PropTypes.func
	}),

	goPage: PropTypes.func

};

const mapStateToProps = (state) => {

	return {
		selectedParticipantTag: state.FetchParticipantReducer.selectedParticipantTag,
		selectedParticipantName: state.FetchParticipantReducer.selectedParticipantName,
		selectedParticipantDescription: state.FetchParticipantReducer.selectedParticipantDescription,
		selectedParticipantImageUrl: state.FetchParticipantReducer.selectedParticipantImageUrl,
		videoAssets: state.VideoReducer.videoAssets,
		currentPage: state.PaginationReducer.currentPage,
		nameTag: state.routing.locationBeforeTransitions.state.nameTag
	}
}

const mapDispatchToProps = (dispatch) => {
	return {actions: bindActionCreators({...UIAction, ...FetchParticipantAction, ...VideoAction, ...PaginationAction}, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantDetails);



export class ParticipantVideos extends Component {

	constructor(props) {
		super(props);
		this.pagerInstance = this.pagerInstance.bind(this);
		this.renderVideoClip = this.renderVideoClip.bind(this);
		this.renderPager = this.renderPager.bind(this)
		this.goNext = this.goNext.bind(this)

	}

	componentDidUpdate() {
		this.props.goPage(this.props.currentPage, this.props.totalPages);

	}

	addDefaultSrc(ev) {
		ev.target.src = './public/profile.png';
	}

	renderVideoClip(item) {
		return (
			<a href={"http://www.tv4play.se/program/idol?video_id=".concat(item.id)}>
				<li className={styles.item} key={item.id}>

					<div>
						<img onError={this.addDefaultSrc} src={item.image} style={{width: 288, height: 218}}
							 alt={"video_image_".concat(item.id)}/>
					</div>
					<div><p>Title: {item.title}</p></div>
					<div><p>Description: {item.description}</p></div>

				</li>
			</a>

		);
	}

	render() {

		return (

			<div className={styles.right}>
				{this.pagerInstance(this.props.currentPage, this.props.totalPages)}
				<ul>
					{
						(this.props.results) ? this.props.results.map(this.renderVideoClip) : null
					}

				</ul>
			</div>


		);
	}

	renderPager = (isPrevious, isNext) => {

		return (
			<div id={styles.container}>
				<div id={styles.left}>
					{(isPrevious) ? <p><a className={styles.clickPreNextCursor}> &lt;&lt;Previous</a></p> :
						<p> &lt;&lt;Previous</p>
					}
				</div>

				<div id={styles.center}>
					<p><a>Page: {this.props.currentPage} </a></p>
				</div>

				<div id={styles.right}>
					{
						(isNext) ?
							<p><a onClick={this.goNext} className={styles.clickPreNextCursor}>Next&gt;&gt;</a></p>
							: <p >Next&gt;&gt;</p>
					}
				</div>
			</div>
		)

	}

	goNext = (event) => {
		console.log("Go to next!!!");
	}


	pagerInstance = (currentPage, totalPages) => {

		if (currentPage === totalPages && (currentPage - 1) === 0 && (currentPage + 1) > totalPages) {
			return this.renderPager(false, false);
		}

		else if (currentPage !== totalPages && (currentPage - 1) === 0) {
			return this.renderPager(false, true);
		}

		else if (currentPage !== totalPages && (currentPage + 1) > totalPages) {
			return this.renderPager(true, false);
		} else {
			return this.renderPager(true, true);
		}

	}


}