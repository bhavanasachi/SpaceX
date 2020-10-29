import { REQUEST_PROGRAMS_STARTED, REQUEST_PROGRAMS_SUCCESS, REQUEST_PROGRAMS_FAILURE } from '../actions/ProgramList';

const initialState = {
    loading: true,
    data: []
}

const programList = (state = initialState, action) => {
switch (action.type) {
    case REQUEST_PROGRAMS_STARTED:
        return {
            ...state,
            loading: true
        };
    case REQUEST_PROGRAMS_SUCCESS:
        console.log('reducers---', action);
        return {
            ...state,
            loading: false,
            error: null,
            data: action.payload
        };
    case REQUEST_PROGRAMS_FAILURE:
    return {
        ...state,
        loading: false,
        error: action.payload.error
    };
    default:
        return state;
    }           
};

export default programList;