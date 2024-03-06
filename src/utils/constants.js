let API_URL;

if (window.location.hostname === "localhost") {
    API_URL = 'http://localhost:3001/api';
} else {
    API_URL = 'my-api-url.com';
}

export default API_URL;
