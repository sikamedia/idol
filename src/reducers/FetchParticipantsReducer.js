import {
  FETCH_POSTS_REQUEST, FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE, SELECT_PARTICIPANT,
} from '../actions/FetchParticipantsAction';

const initialState = {
  participants: [],
  isFetching: false,
  selectedParticipantTag: '',
  selectedParticipantName: '',
  selectedParticipantDescription: '',
  selectedParticipantImageUrl: ''
}

const fetchParticipants = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return {...state, isFetching: true};

    case FETCH_POSTS_SUCCESS:
      return {...state, isFetching: false, participants: action.participants};

    case FETCH_POSTS_FAILURE:
      return state;

    case SELECT_PARTICIPANT:
      return {
        ...state, selectedParticipantTag: action.nameTag, selectedParticipantName: action.name,
        selectedParticipantDescription: action.description, selectedParticipantImageUrl: action.imageUrl
      };
    default:
      return state;

  }
}

export default  fetchParticipants;