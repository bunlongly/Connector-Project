import uuid from 'uuid';
import { SET_AlERT, REMOVE_AlERT } from './type';

export const setAlERT = (msg, alertType) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: SET_AlERT,
    payload: { msg, alertType, id }
  });
};
