import rateLimit from "../config/upstash.js";

export const rateLimiter = async (req, res, next) => {
    const ip = req.ip || req.headers["x-forwarded-for"] || "unknown";
    const { success } = await rateLimit.limit(ip);

    if (!success) {
        return res.status(429).json({
            status: "failed",
            message: "Too many requests. Please slow down.",
        });
    }

    next();
};

// const rateLimiter = async (req, res, next) =>{
//     try{
//         const {success} = await rateLimit.limit("my-limit-key");
//
//         if(!success){
//             return res.status(429).json({
//                 message: "Too may request, please try again later"
//             })
//         }
//
//         next();
//     }catch(e){
//         console.log("Rate limit error", e.message);
//         next(e)
//     }
// }

export default rateLimiter;