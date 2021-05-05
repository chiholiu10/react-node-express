export const types = {
    GET_DATA: "GET_DATA",
    GET_ID: "GET_ID",
    STORE_DATA: "STORE_DATA"
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

