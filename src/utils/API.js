export const searchFiles = (query) => {

    return fetch(`http://127.0.0.1:8000/searchUser=${query}`, {
    "method": "GET"
});
};

export const searchFilesAdmin = (query) => {

    return fetch(`http://127.0.0.1:8000/searchAdmin=${query}`, {
    "method": "GET"
});
};