import poolPromise from "../config/database.config.js";
import mssql from 'mssql';

export const AddToCart = async (user) => {
    const pool = await poolPromise;
    const rs = await pool.request()
        .input('userid', user.uid)
        .input('quantity', user.quantity)
        .input('productid', user.pid)
        .input('productname', user.pname)
        .input('productdesc', user.pdesc)
        .input('productprice', user.pprice)
        .input('productdiscount', user.pdiscount)
        .input('product_imgurl', user.pimageurl)
        .execute('spInsertUpdateCart')

    return rs.rowsAffected;
}

export const GetCartItem = async (uid) => {

    const pool = await poolPromise;
    const rs = await pool.request()
        .input('user_id', mssql.VarChar, uid)
        .execute('spGetAllCart')

    return rs.recordset;
}

export const UpdateCart = async (user) => {

    const pool = await poolPromise;
    const rs = await pool.request()
        .input('userid', user.uid)
        .input('quantity', user.quantity)
        .input('productid', user.pid)
        .input('productname', user.pname)
        .input('productdesc', user.pdesc)
        .input('productprice', user.pprice)
        .input('productdiscount', user.pdiscount)
        .input('product_imgurl', user.pimageurl)
        .execute('spInsertUpdateCart')

    return rs.rowsAffected;
}

export const DeleteFromCart = async (product) => {


    const pool = await poolPromise;
    const rs = await pool.request()
                .input('product_id',product.id)
                .input('user_id',product.uid)
                .execute('spDeleteCart')
         console.log(rs);       
    return rs.rowsAffected;
}