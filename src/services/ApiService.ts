import axios from 'axios';

const getGenericHeader = () => {
    return {
        'accept': 'application/json',
        'Authorization': `Bearer 1234567890`
    }
}

const ApiService = {

    async get(path: string) {
        const response = await axios.get(path, {
            headers: getGenericHeader()
        });
        return response;
    },

    async post(path: string, params: unknown) {
        const response = await axios.post(path, params, {
            headers: getGenericHeader()
        });
        return response;
    },

    async patch(path: string, params: unknown) {
        const response = await axios.patch(path, params, {
            headers: getGenericHeader()
        });
        return response;
    },

    async delete(path: string) {
        const response = await axios.delete(path, {
            headers: getGenericHeader()
        });
        return response;
    },
}

export default ApiService;