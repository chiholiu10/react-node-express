import { types } from "../actions";

const initialState = {
    allMusic: [],
    musicId: ""
};

export const musicData = (state = initialState, action: { type: any; music: object; id: number; details: object; }) => {
    switch (action.type) {
        case types.GET_DATA: {
            return {
                ...state,
                allMusic: action.music
            };
        }

        case types.GET_ID: {
            console.log(action.id);
            return {
                ...state,
                musicId: action.id
            };
        }

        case types.GET_DETAILS: {
            return {
                ...state,
                musicDetail: action.details
            };
        }

        default:
            return state;
    }
};

export default musicData;