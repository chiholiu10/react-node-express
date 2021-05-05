export const types = {
    GET_DATA: "GET_DATA",
    GET_ID: "GET_ID",
    GET_DETAILS: "GET_DETAILS"
};

export const getData = (music: object) => {
    return {
        type: types.GET_DATA,
        music
    };
};

export const getId = (id: number) => {
    return {
        type: types.GET_ID,
        id
    };
};

export const getDetails = (details: object) => {
    return {
        type: types.GET_DETAILS,
        details
    };
};

