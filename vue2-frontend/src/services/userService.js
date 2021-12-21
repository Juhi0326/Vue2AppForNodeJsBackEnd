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

    getUserById(userId) {
        console.log(API_URL + '/' + userId)
        try {
            return axios.get(API_URL + '/' + userId, { headers: authHeader() });
        } catch (error) {
            console.log(error)
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
    changeUserDataById(id, payload) {
        try {
            return axios.patch(API_URL + '/admin/' + id , payload, { headers: authHeader() } )
        } catch (error) {
            return error
        }
    }
    changeMyDataById(id, payload) {
        try {
            return axios.patch(API_URL + '/' + id , payload, { headers: authHeader() } )
        } catch (error) {
            return error
        }
    }
}

export default new UserService;