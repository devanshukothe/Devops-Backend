//It defines an API endpoint and maps it to a controller function.

import express from "express";


//create is exported from controller
import {create, deleteUser, getAllUsers, getUserById, updateUser} from "../controller/userController.js";

const route = express.Router();

//http method -> posting data or creating data into database
route.post("/user",create)
route.get("/users", getAllUsers)
route.get("/user/:id", getUserById)
route.put("/update/user/:id", updateUser)
route.delete("/delete/user/:id", deleteUser)


export default route;