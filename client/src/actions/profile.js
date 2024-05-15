import axios from 'axios';
import { setAlert } from './alert';
import {
  CLEAR_PROFILE,
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  ACCOUNT_DELETED,
  GET_REPOS
} from './types';

const API_BASE_URL = '/api/profile'; // Base URL for profile API endpoints

// Action to get the current user's profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get(`${API_BASE_URL}/me`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({ type: CLEAR_PROFILE });
 
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response?.data?.msg || err.response.statusText,
        status: err.response?.status
      }
    });
  }
};

//Get all profiles
export const getProfiles = () => async dispatch => {
  dispatch({type: CLEAR_PROFILE});

  try {
    const res = await axios.get(`${API_BASE_URL}`);
    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
  } catch (err) {
    console.error('Failed to fetch profile:', err);
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response?.data?.msg || err.response.statusText,
        status: err.response?.status
      }
    });
  }
};

//Get Profile by ID
export const getProfileById = userId => async dispatch => {
    try {
    const res = await axios.get(`${API_BASE_URL}/user/${userId}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    console.error('Failed to fetch profile:', err);
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response?.data?.msg || err.response.statusText,
        status: err.response?.status
      }
    });
  }
};

//Get Github repos
export const getGithubRepos = username => async dispatch => {
  try {
    const res = await axios.get(`${API_BASE_URL}/github/${username}`);
    dispatch({
      type: GET_REPOS,
      payload: res.data
    });
  } catch (err) {
    console.error('Failed to fetch profile:', err);
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response?.data?.msg || err.response.statusText,
        status: err.response?.status
      }
    });
  }
};

// Action to create or update a profile
export const createProfile =
  (formData, navigate, isEdit = false) =>
  async dispatch => {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' }
      };
      const endpoint = API_BASE_URL; // Use the same endpoint for both create and update
      const res = await axios.post(endpoint, formData, config);

      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
      dispatch(
        setAlert(isEdit ? 'Profile Updated' : 'Profile Created', 'success')
      );
      navigate('/dashboard');
    } catch (err) {
      console.error('Failed to create/update profile:', err);
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg:
            err.response && err.response.data && err.response.data.errors
              ? err.response.data.errors.map(error => error.msg).join(', ')
              : 'Error with request',
          status: err.response ? err.response.status : 'Network error'
        }
      });
      dispatch(setAlert('Failed to update profile', 'danger'));
    }
  };

//Add Experience
export const addExperience = (formData, navigate) => async dispatch => {
  const config = {
    headers: { 'Content-Type': 'application/json' }
  };

  try {
    const res = await axios.put(`${API_BASE_URL}/experience`, formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    dispatch(setAlert('Experience Added', 'success'));
    navigate('/dashboard');
  } catch (err) {
    console.error('Failed to add experience', err);
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg:
          err.response && err.response.data && err.response.data.errors
            ? err.response.data.errors.map(error => error.msg).join(', ')
            : 'Error with request',
        status: err.response ? err.response.status : 'Network error'
      }
    });
    dispatch(setAlert('Failed to add experience', 'danger'));
  }
};

//Add Education
export const addEducation = (formData, navigate) => async dispatch => {
  const config = {
    headers: { 'Content-Type': 'application/json' }
  };

  try {
    const res = await axios.put(`${API_BASE_URL}/education`, formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    dispatch(setAlert('Education Added', 'success'));
    navigate('/dashboard');
  } catch (err) {
    console.error('Failed to add experience', err);
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg:
          err.response && err.response.data && err.response.data.errors
            ? err.response.data.errors.map(error => error.msg).join(', ')
            : 'Error with request',
        status: err.response ? err.response.status : 'Network error'
      }
    });
    dispatch(setAlert('Failed to add Education', 'danger'));
  }
};

//Delete experience
export const deleteExperience = id => async dispatch => {
  try {
    const res = await axios.delete(`${API_BASE_URL}/experience/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Experience Remove', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Delete experience
export const deleteEducation = id => async dispatch => {
  try {
    const res = await axios.delete(`${API_BASE_URL}/education/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Education Remove', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Delete account & profile
export const deleteAccount = id => async dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await axios.delete(`${API_BASE_URL}`);

      dispatch({
        type: CLEAR_PROFILE
      });

      dispatch({
        type: ACCOUNT_DELETED
      });

      dispatch(setAlert('Your account has been permanantly deleted'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};
