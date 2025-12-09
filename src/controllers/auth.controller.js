import service from "../services/user.service.js"
import jwt from "jsonwebtoken"
import "dotenv/config"

const key = process.env.JWT_KEY;

export async function login(req,res){
    const {email, pass} = req.body;

    try {
        const user = await service.validateUser(email.toLowerCase(),pass)

        if(!user)
            return res.status(401).json({ "error": "Email no vinculado a un usuario. Verifique e intente de nuevo" });

        const expiration = { expiresIn : `1h` };
        const tokenPayload = {
            "id": user.id, 
            "email": user.Email,
            "rol" : user.Rol
        };
        
        const token = jwt.sign(tokenPayload,key,expiration);

        return res.status(200).json({ token: token });        
    
    } catch (error) {
        return res.status(500).json({
            "error": `Error al procesar la solicitud`,
            "detail": `${error.message}`
        });
    }
}
