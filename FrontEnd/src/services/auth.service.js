import axios from "axios";

const BASE_URL = ' http://localhost:7000/auth/';

export const LoginService = async (user) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    const response = await axios.post(BASE_URL + 'login', user, config);
    
    console.info(response);
    if (response.data.token) {
        sessionStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data
}

export const getCurrentUser = () => {
    return {
        user: sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : null
    }
}
