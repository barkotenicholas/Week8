import poolPromise from '../config/database.config.js'

export const AddUser = async (user) => {

    const pool = await poolPromise
    const response = await pool.request()
        .input('id', user.id)
        .input('firstname', user.firstname)
        .input('lastname', user.lastname)
        .input('email', user.email)
        .input('password', user.password)
        .execute('spInsertUser')

    return response.rowsAffected;
}

export const Login = async (email) => {
    const pool = await poolPromise
    const response = await pool.request()
        .input('email', email)
        .execute('spSelectUser')

    return response.recordset[0]
}


