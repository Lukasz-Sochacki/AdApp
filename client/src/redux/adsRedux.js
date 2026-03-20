import { API_URL } from '../config';

//selectors
export const getAllAds = ({ ads }) => ads;
export const getAdById = ({ ads }, adId) => ads.find((ad) => ad._id === adId);

//actions
const createActionName = (actionName) => `app/ads/${actionName}`;
const UPDATE_ADS = createActionName('UPDATE_ADS');

//action creators
export const updateAds = (payload) => ({ type: UPDATE_ADS, payload });

export const fetchAds = () => {
  return (dispatch) => {
    fetch(`${API_URL}/api/ads`)
      .then((res) => res.json())
      .then((ads) => dispatch(updateAds(ads)));
  };
};

export const addAdRequest = (newAd) => {
  return (dispatch) => {
    const options = {
      method: 'POST',
      body: newAd, //newAd will be an object FormData received from component
      credentials: 'include',
    };
    return fetch(`${API_URL}/api/ads`, options)
      .then((res) => res.json())
      .then(() => dispatch(fetchAds()));
  };
};

export const editAdRequest = (adData, id) => {
  return (dispatch) => {
    const options = {
      method: 'PUT',
      body: adData, //FormData
      credentials: 'include',
    };
    return fetch(`${API_URL}/api/ads/${id}`, options)
      .then((res) => res.json())
      .then(() => dispatch(fetchAds()));
  };
};

export const removeAdRequest = (id) => {
  return (dispatch) => {
    const options = {
      method: 'DELETE',
      credentials: 'include',
    };
    return fetch(`${API_URL}/api/ads/${id}`, options).then(() =>
      dispatch(fetchAds()),
    );
  };
};

const adsReducer = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_ADS:
      return [...action.payload];
    default:
      return statePart;
  }
};

export default adsReducer;
