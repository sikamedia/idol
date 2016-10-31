import {FIND_PARTICIPANT_REQUEST,
	FIND_PARTICIPANT_REQUEST_SUCCESS,
	FIND_PARTICIPANT_REQUEST_FAILURE} from '../actions/FindParticipantAction';

const initialState = {
	participant: {},
	isFetching: false
}