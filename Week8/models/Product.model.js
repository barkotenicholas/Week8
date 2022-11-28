import poolPromise from '../config/database.config.js';
import mssql from 'mssql';

export const InsertProduct = async (product) => {

    const pool = await poolPromise
    const response = await pool.request()
        .input('id', mssql.VarChar, product.id)
        .input('name', mssql.VarChar, product.name)
        .input('description', mssql.VarChar, product.description)
        .input('imageurl', mssql.VarChar, product.imageurl)
        .input('price', mssql.Int, product.price)
        .input('discount', mssql.Int, product.discount)
        .execute('spInsertProduct')

    return response.rowsAffected;
}

export const GetProducts = async () => {
    const pool = await poolPromise
    const rs = await pool.request()
        .execute('spGetAllProducts')

    return rs.recordset;
}

export const DeleteProduct = async (id) => {

    const pool = await poolPromise
    const response = await pool.request()
        .input('id', id)
        .execute('spDeleteProduct')

    return response.rowsAffected
}