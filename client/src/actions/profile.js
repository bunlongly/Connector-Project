import axios from 'axios';
import { setAlert } from './alert';
import { GET_PROFILE, PROFILE_ERROR } from './types';

// Get current user's profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    const errorMessage = err.response ? err.response.statusText : 'Error';
    const errorCode = err.response ? err.response.status : 500; // Default to 500 if status is not available
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: errorMessage, status: errorCode }
    });
  }
};


// Create or update a profile
export const createProfile = (formData, edit = false) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/profile', formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

    return res; // Return the response to handle navigation in component
  } catch (err) {
    const errorMessage = err.response ? err.response.statusText : 'Error';
    const errorCode = err.response ? err.response.status : 500;

    if (err.response && err.response.data.errors) {
      err.response.data.errors.forEach(error => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    } else {
      dispatch(setAlert('Failed to update profile, please try again', 'danger'));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: errorMessage, status: errorCode }
    });

    throw err; // Throw an error to catch it in the component
  }
};



