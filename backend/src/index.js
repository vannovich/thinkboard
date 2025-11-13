import express from "express";
import cors from "cors";

import routes from "./routes/noteRoutes.js";
import {connectDB} from "./config/db.js";
import dotenv from "dotenv";
import rateLimit from "./config/upstash.js";
import rateLimiter from "./middleware/rateLimiter.js";

const app = express();
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", routes);

connectDB().then(()=>{
    app.listen(port, () => console.log(`Server running on port ${port}`));
})
