export const GO_TO_PRE_PAGE = 'GO_TO_PRE_PAGE';
export const GO_TO_NEXT_PAGE = 'GO_TO_NEXT_PAGE';
export const  GO_TO_SPECIFIC_PAGE = 'GO_TO_SPECIFIC_PAGE';


export const prePage = () => {
	return {

		type: GO_TO_PRE_PAGE
	}
}


export const nextPage = () => {
	return {
		type: GO_TO_NEXT_PAGE,
	}
}

export const goPage = (pageNumber, totalPages) => {
	return {
		type: GO_TO_SPECIFIC_PAGE,
		pageNumber,
		totalPages
	}
}