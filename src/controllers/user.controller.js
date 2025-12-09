import service from "../services/user.service.js"
import { UserCreateSchema } from "../models/user.model.js"

export async function GetAllUser(req,res) {
    try {
        const list = await service.getAllUser();

        if(list.length == 0)
            return res.status(200).json({msg : `No hay usuarios registrados. Agregue uno para visualizarlo`});
        
        return res.status(200).json(list);

    } catch (error) {
        return res.status(500).json({
            "error": `Error al procesar la solicitud`,
            "detail": `${error.message}`
        });
    }
}

export async function GetUserById(req,res) {
    const id = req.params.id;

    try {
        const user = await service.getUserById(id)

        if(!user)
            return res.status(400).json({ "error": `No se encuentro un usuario con ID: ${id}`})

        return res.status(200).json(user);

    } catch (error) {
        return res.status(500).json({
            "error": `Error al procesar la solicitud`,
            "detail": `${error.message}`
        });
    }
}

export async function CreateUser(req,res) {
    try {
        const user = UserCreateSchema.parse(req.body);
        const saved = await service.createUser(user)

        return res.status(201).json(saved);

    } catch (error) {
        return res.status(500).json({
            "error": `Error al procesar la solicitud`,
            "detail": `${error.message}`
        });
    }
}

export async function DeleteUser(req,res) {
    const id = req.params.id;
    try {
        await service.deleteUser(id);

        return res.status(204).send();

    } catch (error) {
        return res.status(500).json({
            "error": `Error al procesar la solicitud`,
            "detail": `${error.message}`
        });
    }
}
