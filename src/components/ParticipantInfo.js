import React, {Component, PropTypes} from "react";
import { StringOperator } from "../common/StringOperator";
import styles from "../../public/style.css";
//var Hashes = require('jshashes')
import Hashes from "jshashes"

const stringOperator = new StringOperator;
const MD5 = new Hashes.MD5;

const public_dir = '../../public';
import profile_tao from '../../public/profile.png';

console.log("profile tao picture: ", profile_tao);

export default class ParticipantInfo extends Component {

	constructor(props) {
		super(props);
		this.convertTextArray = stringOperator.convertTextArray
		this.convertTextArray = this.convertTextArray.bind(this);
	}

	renderDescription = (text) => {
		//return (<h6 key={ new Hashes.SHA1().b64(text)}>{text}</h6>);
		return (<h6 key={MD5.hex(text)}>{text}</h6>);
	}


	render() {
		return (
			<div className={styles.left}>
				<ul>
					<div className={styles.withBgSize} style={{backgroundImage: `url(${this.props.imageUrl})`}}></div>
					<div><h3 style={{textAlign: 'left'}}> {this.props.name} </h3></div>
					<div> {this.convertTextArray(this.props.description).map(this.renderDescription)}</div>
				</ul>
				<div>
					<img src={profile_tao} />
				</div>
			</div>

		);
	}
}