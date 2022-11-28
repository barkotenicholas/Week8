import app from "./config/express.config.js";
import dotenv from "dotenv";

/* Configure dotenv */
dotenv.config()

/* Start server*/ 
app.listen(process.env.PORT || 4000,()=>{
    console.log(`⚡️[server]: Server is running at https://localhost:${process.env.PORT}`);
})