import axios from 'axios';
import { setAlert } from './alert';
import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE } from './types';

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
        msg: err.response && err.response.data && err.response.data.errors
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
        msg: err.response && err.response.data && err.response.data.errors
              ? err.response.data.errors.map(error => error.msg).join(', ')
              : 'Error with request',
        status: err.response ? err.response.status : 'Network error'
      }
    });
    dispatch(setAlert('Failed to add Education', 'danger'));
  }
};
