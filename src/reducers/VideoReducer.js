import {FETCH_POSTS_REQUEST_VIDEO, FETCH_POSTS_SUCCESS_VIDEO,
	FETCH_POSTS_FAILURE_VIDEO} from '../actions/VideoAction'

const initialState = {
	videoAssets: {},
	isFetching: false
}

const fetchVideoAssets = (state=initialState, action) => {
	switch (action.type) {
		case FETCH_POSTS_REQUEST_VIDEO:
			return {...state, isFetching: true};

		case FETCH_POSTS_SUCCESS_VIDEO:
			return {...state, isFetching: false, videoAssets: action.videoAssets};

		case FETCH_POSTS_FAILURE_VIDEO:
			return state;

		default:
			return state;

	}
}

export default  fetchVideoAssets;
