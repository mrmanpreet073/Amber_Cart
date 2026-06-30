import {Router} from 'express'
import * as controller from '../controller/userController.js'
import { authenticate, isAdmin } from '../Middleware/authenticate.js'
import { singleUpload } from '../../../Common/Middleware/multer.js'

const router = Router()

router.post("/register",controller.register)
router.post("/verify",controller.verify)
router.post("/reVerify",controller.reVerify)
router.post("/login",controller.login)
router.post("/logout",authenticate,controller.logout)
router.post("/forgotPassword",controller.forgotPassword)
router.post("/verifyOtp/:email",controller.verifyOtp)
router.post("/allUsers",authenticate,isAdmin,controller.allUsers)
router.post("/getUserById/:userId",authenticate,controller.getUserById)
router.post("/updateProfile/:id",authenticate,singleUpload,controller.updateUser)

export default router


