import express from "express";
import cors from "cors";
import path from "path";

import routes from "./routes/noteRoutes.js";
import {connectDB} from "./config/db.js";
import dotenv from "dotenv";
import rateLimit from "./config/upstash.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
const __dirname = path.resolve();


// middleware
if(process.env.NODE_ENV !== "production") {
    app.use(cors());
}
app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", routes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.use( (req, res,next) =>{

    if (!req.path.startsWith("/api")) {
        res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
    } else {
        next();
    }
        res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
    })

}

connectDB().then(()=>{
    app.listen(port, () => console.log(`Server running on port ${port}`));
})
