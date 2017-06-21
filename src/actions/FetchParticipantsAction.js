export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const SELECT_PARTICIPANT = 'SELECT_PARTICIPANT';

export const request = () => (dispatch, getState) => {

  let fetchPostsRequestType = {type: FETCH_POSTS_REQUEST};

  dispatch(fetchPostsRequestType);

  fetch("http://api.tv4play.se/site/programs/idol").then(function (response) {
    return response.json();
  }).then((json) => {
    dispatch(requestSuccess(json.participant_groups[0].participants));
  }).catch((ex) => {
    console.log('fetching idols failed', ex)
    dispatch(requestFailure());
  })
}

export const findParticipantRequest = (person_tag) => (dispatch, getState) => {
  let fetchPostsRequestType = {type: FETCH_POSTS_REQUEST};

  dispatch(fetchPostsRequestType);

  fetch("http://api.tv4play.se/site/programs/idol").then(function (response) {
    return response.json()
  }).then((json) => {

    let searchedElement = search(person_tag, json.participant_groups[0].participants);
    dispatch(selectParticipant(searchedElement.person_tag, searchedElement.name, searchedElement.description,
      searchedElement.image.url));
  }).catch((ex) => {
    console.log('find participant failed', ex)
  })

}

const search = (person_tag, participants) => {
  let result = null;
  participants.some(element => {

    if (element.person_tag === person_tag) {
      result = element;
      return true;
    }
  });
  return result;
}

export const requestSuccess = (participants) => {
  return {
    type: FETCH_POSTS_SUCCESS,
    participants
  }
}

export const requestFailure = () => {
  return {
    type: FETCH_POSTS_FAILURE
  }
}

export const selectParticipant = (nameTag, name, description, imageUrl) => {
  return {
    type: SELECT_PARTICIPANT,
    nameTag,
    name,
    description,
    imageUrl
  }
}