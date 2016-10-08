import {FETCH_POSTS_REQUEST, FETCH_POSTS_SUCCESS,
	FETCH_POSTS_FAILURE, SELECT_PARTICIPANT} from '../actions/FetchParticipantAction'

const initialState = {
	participants: [],
	isFetching: false,
	selectedParticipant: ''

}

const fetchParticipant = (state=initialState, action) => {
	switch (action.type) {
		case FETCH_POSTS_REQUEST:
			return {...state, isFetching: true};

		case FETCH_POSTS_SUCCESS:
			return {...state, isFetching: false, participants: action.participants};

		case FETCH_POSTS_FAILURE:
			return state;

		case SELECT_PARTICIPANT:
			return {...state, selectedParticipant: action.nameTag};
		default:
			return state;

	}
}

export default  fetchParticipant;