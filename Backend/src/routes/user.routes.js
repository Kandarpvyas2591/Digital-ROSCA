import { Router } from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  //   refreshAccessToken,
  changeCurrentPassword,
  getMe,
} from '../controllers/user.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
const router = Router();

router.route('/register').post(registerUser);

router.route('/login').post(loginUser);

router.route('/logout').post(verifyJWT, logoutUser);

router.route('/change-password').post(verifyJWT, changeCurrentPassword);

router.route('/getme').get(verifyJWT, getMe);
export default router;
