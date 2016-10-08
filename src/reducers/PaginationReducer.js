import  {GO_TO_PRE_PAGE, GO_TO_NEXT_PAGE, GO_TO_SPECIFIC_PAGE} from '../actions/PaginationAction'

const initialState = {
	currentPage: 1,
	totalPage: 0
}


const paginationClick = (state=initialState, action) => {
	switch (action.type) {

		case GO_TO_PRE_PAGE:

			if (state.currentPage == 1) {
				return state;
			} else {
				return {...state, currentPage: state.currentPage - 1};
			}
		case GO_TO_NEXT_PAGE:

			if (state.currentPage == state.totalPage) {
				return state;
			} else {
				return {...state, currentPage: state.currentPage + 1 }
			}
		case GO_TO_SPECIFIC_PAGE:
			if (state.currentPage == action.pageNumber) {
				return state;
			} else {
				return {...state, currentPage: state.pageNumber};
		}

		default:
			return state;
	}
}


export default paginationClick;