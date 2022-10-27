import axios from 'axios';

class UsersApi {
    getToken () {
        return axios.get('https://frontend-test-assignment-api.abz.agency/api/v1/token')
    }

    getUsers (count) {
        return axios.get(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=${count}`);
    }

    getPositions () {
        return axios.get('https://frontend-test-assignment-api.abz.agency/api/v1/positions');
    }

    postUser (body, token) {
        return axios.post('https://frontend-test-assignment-api.abz.agency/api/v1/users', body, {
            headers: {
                'Token': token,
                'Content-Type': 'multipart/form-data',
            }
        });
    }
}

export default new UsersApi();
