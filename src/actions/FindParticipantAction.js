export const FIND_PARTICIPANT_REQUEST = 'FIND_PARTICIPANT_REQUEST';
export const FIND_PARTICIPANT_REQUEST_SUCCESS = 'FIND_PARTICIPANT_REQUEST_SUCCESS';
export const FIND_PARTICIPANT_REQUEST_FAILURE = 'FIND_PARTICIPANT_REQUEST_FAILURE';


export const findParticipantRequest = () => (dispatch, getState) => {
	let findParticipantRequestType = {type: FIND_PARTICIPANT_REQUEST};
	dispatch(findParticipantRequestType);

	fetch("http://api.tv4play.se/site/programs/idol").then(function (response) {
		return response.json()
	}).then((json) => {
		//dispatch(requestSuccess(json.participant_groups[0].participants))
	}).catch((ex) => {
		console.log('find participant failed', ex)
	})

}

export const findParticipantRequestSuccess = (participant) => {
	return {
		type: FIND_PARTICIPANT_REQUEST_SUCCESS,
		participant
	}
}
