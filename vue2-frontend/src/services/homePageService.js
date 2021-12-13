import axios from 'axios';
//import authHeader from './auth-header';

const API_URL = 'http://localhost:8081/';


class HomePageService {
  getHomePage() {
    return axios.get(API_URL + 'homePage');
  }

}

export default new HomePageService;