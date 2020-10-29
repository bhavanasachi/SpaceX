import axios from 'axios';
export const REQUEST_PROGRAMS_STARTED = 'REQUEST_PROGRAMS_STARTED';
export const REQUEST_PROGRAMS_SUCCESS = 'REQUEST_PROGRAMS_SUCCESS';
export const REQUEST_PROGRAMS_FAILURE = 'REQUEST_PROGRAMS_FAILURE';

const requestProgramSuccess = data => ({
    type: REQUEST_PROGRAMS_SUCCESS,
    payload: {
      ...data
    }
  });
  
const requestProgramStarted = () => ({
    type: REQUEST_PROGRAMS_STARTED
});

const requestProgramFailure = error => ({
    type: REQUEST_PROGRAMS_FAILURE,
    payload: {
        error
    }
});

export function fetchPrograms(param) {
    return dispatch => {
        dispatch(requestProgramStarted());
    
        axios
          .get(`https://api.spacexdata.com/v3/launches?limit=100${param}`)
          .then(res => {
            dispatch(requestProgramSuccess(res.data));
          })
          .catch(err => {
            dispatch(requestProgramFailure(err.message));
          });
    };
}