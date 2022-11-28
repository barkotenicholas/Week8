import { AddToCart, DeleteFromCart, GetCartItem, UpdateCart } from "../models/Cart.model.js";


export const AddCart = async (req, res) => {


    try {


        const { uid, quantity, pid, pname, pdesc, pprice, pdiscount, imageurl } = req.body;
        const response = await AddToCart({
            uid: uid,
            quantity: quantity,
            pid: pid,
            pname: pname,
            pdesc: pdesc,
            pprice: pprice,
            pdiscount: pdiscount,
            pimageurl: imageurl
        })
        console.log(response);
        return res.status(200).json({ success: true, message: "added to cart successfully" });

    } catch (error) {
        console.log("error"+error.message);
        return res.status(403).json({ success: false, message: error.message });
    }


}

export const GetCart = async (req, res) => {
    try {

        const uid = req.query.id;

        const rs = await GetCartItem(uid)
        return res.status(200).json(rs)

    } catch (error) {
        return res.status(200).json({ success: false, message: error.message });

    }

}

export const updateQuantity = async (req, res) => {

    try {
        const { user_id, quantity, product_id, product_name, product_desc, product_price, product_dicount ,imageurl } = req.body;
        const rs = await UpdateCart({
            uid: user_id,
            quantity: quantity,
            pid: product_id,
            pname: product_name,
            pdesc: product_desc,
            pprice: product_price,
            pdiscount: product_dicount,
            pimageurl:imageurl
        });
        if (rs) return res.status(200).json({ success: true, message: "updated cart quantity successfully" });

    } catch (error) {
        return res.status(200).json({ success: false, message: error.message });

    }

}
export const DeleteCart = async (req, res) => {
    try {
        const { uid, pid } = req.body;

        const response = await DeleteFromCart({
            id: pid,
            uid: uid
        })
        console.log(response);

        if (response) return res.status(200).json({ success: true, message: " cart deleted successfully" });

    } catch (error) {

    }
}