import axios from 'axios';
import { setAlert } from './alert';

import { GET_PROFILE, PROFILE_ERROR } from './types';

//Get current users profile
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
  
