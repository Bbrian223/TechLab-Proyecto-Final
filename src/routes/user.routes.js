import express from "express";
import { IsAdmin } from "../middlewares/adminPermission.js";
import { 
    GetAllUser,
    GetUserById,
    CreateUser,
    DeleteUser 
} from "../controllers/user.controller.js"

const router = express.Router();

router.get("/", GetAllUser);
router.get("/:id", GetUserById);
router.post("/create", IsAdmin, CreateUser);
router.delete("/:id", IsAdmin, DeleteUser);


export default router;