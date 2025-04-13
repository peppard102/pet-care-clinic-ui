import axios from 'axios';

// TODO: Set up reverse proxy in webpack dev server and nginx
axios.defaults.baseURL = 'https://localhost:7132/';

export default axios;
