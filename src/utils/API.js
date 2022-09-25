export const searchFiles = (query) => {

    return fetch(`http://127.0.0.1:8000/search=${query}`, {
    "method": "GET"
});
};