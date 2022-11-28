import { AddUser, Login } from "../models/User.model.js";
import { v4 } from 'uuid';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

export const LoginUser = async (req, res) => {

    try {

        const { email, password } = req.body;
        const result = await Login(email);
        if (!result) return res.status(403).json({ message: `user not found` });
        const checkpwd = await bcrypt.compare(password, result.password)
        if (!checkpwd) return res.status(403).json({ message: 'wrong password' });
        const { id, firstname, lastname } = result;
        const token = jwt.sign(
            {
                firstname,
                lastname,
                email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '5s'
            }
        )
        return res.status(200).json({
            auth: true,
            id:id,
            message: 'log in success',
            firstname: firstname,
            lastname: lastname,
            email: email,
            token: token
        })

    } catch (error) {

    }


}

export const signUp = async (req, res) => {

    try {
        const id = v4();
        const { email, firstname, lastname, password } = req.body;
        const result = await Login(email)
        console.log(result);
        if (result.length !== 0) return res.status(200).json({ message: "user Already exist in system" });

        const hashedpwd = await bcrypt.hash(password, 9);
        const userresult =
            await AddUser({
                id: id,
                email: email,
                firstname: firstname,
                lastname: lastname,
                password: hashedpwd
            })
        if (userresult) {
            return res.status(200).json({ message: "user created successfully" })
        }

    } catch (error) {
        return res.status(403).json({ message: error.message })

    }
}