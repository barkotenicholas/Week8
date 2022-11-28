import poolPromise from "../config/database.config.js";
import { GetProducts, InsertProduct ,DeleteProduct } from "../models/Product.model.js"



export const AddProduct = async (req, res) => {

    try {

        const { id, name, description, imageurl, price, discount } = req.body;

        await InsertProduct({
            id: id,
            name: name,
            description: description,
            imageurl: imageurl,
            price: price,
            discount: discount
        })

        return res.status(200).json({
            success: true,
            message: "product created successfully"
        })
    } catch (error) {
        return res.status(403).json({
            success: false,
            message: "product not created successfully"
        })
    }

}

export const GetAllProducts = async (req, res) => {
    try {

        const result = await GetProducts()
        return res.status(200).json(result)

    } catch (error) {

        return res.status(400).json({ message: error.message })

    }
}

export const Delete = async (req, res) => {
    try {
        const {id} = req.body;
        console.log("this is id"+id);
        const result = await DeleteProduct(id)
        if(result){
            return res.status(200).json({message:'Deleted Successfully'})
        }
    } catch (error) {
        return res.status(200).json({message:error.message})
    }
}