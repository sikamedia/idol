import React, {Component, PropTypes} from "react";
import { StringOperator } from "../common/StringOperator";
import styles from "../../public/style.css";

const stringOperator = new StringOperator();

export default class ParticipantInfo extends Component {

	constructor(props) {
		super(props);
		this.convertTextArray = stringOperator.convertTextArray
		this.convertTextArray = this.convertTextArray.bind(this);
	}

	renderDescription = (text) => {
		return (<h6>{text}</h6>);
	}


	render() {
		return (
			<div className={styles.left}>
				<ul>
					<div className={styles.withBgSize} style={{backgroundImage: `url(${this.props.imageUrl})`}}></div>
					<div><h3 style={{textAlign: 'left'}}> {this.props.name} </h3></div>
					<div> {this.convertTextArray(this.props.description).map(this.renderDescription)}</div>
				</ul>
			</div>

		);
	}

}