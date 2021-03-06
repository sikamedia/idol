import React, { Component } from 'react';
// import {participants} from '../../test/mock_data/mock'
import 'whatwg-fetch';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import * as FetchParticipantAction from '../actions/FetchParticipantsAction';
import * as VideoAction from '../actions/VideoAction';
import styles from '../../public/style.css';


class ParticipantList extends Component {


  constructor(props) {
    super(props);
    this.onItemClicked = this.onItemClicked.bind(this);
    this.renderParticipant = this.renderParticipant.bind(this);
  }

  componentWillMount() {
    this.props.actions.request();
  }

  onItemClicked = item => () => {
      // this.props.actions.setShowParticipant();
    this.props.actions.selectParticipant(item.person_tag,
        item.name, item.description, item.image.url);
  }

  renderParticipant(item) {
    return (
      <Link key={item.person_tag} to={{ pathname: `/idol/${item.person_tag}`, state: { nameTag: item.person_tag } }} >
        <li onClick={this.onItemClicked(item)} className={styles.item} role="link">
          <div className={styles.withBgSize} style={{ backgroundImage: `url(${item.image.url})` }} />
          <div className={styles.center}> {item.name} </div>
        </li>
      </Link>
    );
  }

  render() {
    // debugger;
    return (
      <div>
        <ul className={styles.container}>
          {
            this.props.participants.map(item => this.renderParticipant(item))
          }
        </ul>
      </div>
    );
  }

}

// react proptypes
ParticipantList.propTypes = {
  actions: React.PropTypes.shape({
    // setShowParticipant: React.PropTypes.func,
    request: React.PropTypes.func,
    selectParticipant: React.PropTypes.func,
    videoAssetsRequest: React.PropTypes.func,
  }),
};


function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ ...FetchParticipantAction, ...VideoAction }, dispatch) };
}

const mapStateToProps = state => ({
  participants: state.FetchParticipantsReducer.participants,
  selectedParticipantTag: state.FetchParticipantsReducer.selectedParticipantTag,
  videoAssets: state.VideoReducer.videoAssets,
});

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantList);
