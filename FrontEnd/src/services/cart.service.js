import axios from "axios";

const BASE_URL = ' http://localhost:7000/cart/';

export const AddProduct = async (product) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    const response = await axios.post(BASE_URL, product, config);
    return response.data
}

export const PatchCart = async(product)=>{

    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    const response = await axios.patch(BASE_URL, product, config);

    return response.data
}

export const GetCart = async (id) => {


    const response = await axios.get(BASE_URL, {
        params: {
            id
        }
    });

    return response.data
}
export const DeleteFromCart = async (product) => {
    try {
        console.log(product);
        const response = await axios.delete(BASE_URL, { data: product });
        console.log(response);
        return response.data
    } catch (error) {

    }

}
