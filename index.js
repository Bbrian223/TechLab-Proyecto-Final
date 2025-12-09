import express from "express";
import cors from "cors";
import prodRoute from "./src/routes/product.routes.js";
import authRoute from "./src/routes/auth.routes.js";
import userRoute from "./src/routes/user.routes.js";
import { NotFound } from "./src/middlewares/notfound.js";
import { authentication } from "./src/middlewares/authentication.js";
import "dotenv/config"

const App = express();

App.use(cors());
App.use(express.json());
App.use("/auth", authRoute);
App.use("/user",authentication,userRoute);
App.use("/api", authentication,prodRoute);


App.use(NotFound);

const PORT = process.env.PORT || 3001;
App.listen(PORT, ()=> {
    console.log(`http://localhost:${PORT}`);
});