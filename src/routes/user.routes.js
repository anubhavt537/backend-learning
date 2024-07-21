import { Router } from "express";
import { regsiterUser } from "../controllers/user.controller.js";
import {upload} from '../middlewares/multer.middleware.js'

const router=Router()
 
 router.route("./register").post(
    upload.fields([
        {
            name:image,
            maxCount:1
        },
        {
            name:avatar,
            maxCount:1
        }
    ]),
    regsiterUser)


export default router