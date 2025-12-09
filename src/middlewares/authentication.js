import jwt from "jsonwebtoken"
import "dotenv/config"

const key = process.env.JWT_KEY;

export const authentication = (req,res,next) =>{
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "Falta header Authorization" });
    }

    const token = authHeader.split(" ")[1];
    if(!token) return res.status(401).json({error: "No autorizado"});

    jwt.verify(token,key, (err,decoded) =>{
        if(err) return res.status(403).json({error: "credennciales invalidas"});

        req.user = decoded;
        next();
    });
};