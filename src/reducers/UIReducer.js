import {SHOW_FILTER} from '../actions/UIAction';

const initialState = {
	show: true
}

const pageUIShow = (state=initialState, action) => {

	switch (action.type) {
		case SHOW_FILTER:
			return {...state, show: !state.show};
		default:
			return state;
	}
}
export default pageUIShow;