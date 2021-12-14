import axios from 'axios';
import authHeader from './authHeader';

const API_URL = 'http://localhost:8081/users';

class UserService {
    getUsers() {
        try {
            return axios.get(API_URL, { headers: authHeader() });
        } catch (error) {
           return error
        }
    }

    deleteUserById(id) {
        try {
            return axios.delete(API_URL + '/' + id , { headers: authHeader() })
        } catch (error) {
            return error
        }
    }
}

export default new UserService;