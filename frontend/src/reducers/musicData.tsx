import { types } from "../actions";

const initialState = {
    allMusic: [],
    musicId: ""
};

export const musicData = (state = initialState, action: { type: any; music: object; id: number; }) => {
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

        default:
            return state;
    }
};

export default musicData;