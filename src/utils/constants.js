let BASE_URL;

if (window.location.hostname === "localhost") {
    BASE_URL = 'http://localhost:3000';
} else {
    BASE_URL = 'https://api.alrededorusa.mooo.com';
}

export default BASE_URL;
