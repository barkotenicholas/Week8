import axios from "axios";

const BASE_URL = ' http://localhost:7000/product/';
import authHeader from "./authHeader";
export const AddProduct = async (product) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    const response = await axios.post(BASE_URL, product, config);
    console.info(response);

    return response.data
}

export const GetAllProducts = async () => {
    const config = {
        headers: authHeader()
    }
    const response = await axios.get(BASE_URL, config);
    console.log(response.data);

    return response.data
}

export const DeleteProduct = async (pid) => {
    try {
        const data = {
            id: pid
        }
        const response = await axios.delete(BASE_URL, { data: data });
        console.log(response);
        return response.data
    } catch (error) {

    }
}
