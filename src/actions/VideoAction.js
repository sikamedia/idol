export const FETCH_POSTS_REQUEST_VIDEO = 'FETCH_POSTS_REQUEST_VIDEO';
export const FETCH_POSTS_FAILURE_VIDEO = 'FETCH_POSTS_FAILURE_VIDEO';
export const FETCH_POSTS_SUCCESS_VIDEO = 'FETCH_POSTS_SUCCESS_VIDEO';

export const videoAssetsRequest = (nameTage, pageNumber) => (dispatch, getState) => {

  dispatch({
    type: FETCH_POSTS_REQUEST_VIDEO
  })

  console.log("this video assets fetch", "http://api.tv4play.se/play/video_assets.json?tags=".concat(nameTage).concat("&page=").concat(pageNumber));
  fetch("http://api.tv4play.se/play/video_assets.json?tags=".concat(nameTage)).then(function (response) {
    return response.json()
  }).then((json) => {
    dispatch(requestSuccess(json))
  }).catch((ex) => {
    console.log('parsing failed', ex)
    dispatch(requestFailure());
  })
}

export const requestSuccess = (videoAssets) => {
  return {
    type: FETCH_POSTS_SUCCESS_VIDEO,
    videoAssets,
  };
}

export const requestFailure = () => {
  return {
    type: FETCH_POSTS_FAILURE_VIDEO,
  };
}