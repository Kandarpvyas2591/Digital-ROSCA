import { Router } from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getMe,
  updateUser,
  checkPassword,
  getUserById,
} from '../controllers/user.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
const router = Router();

router.route('/register').post(registerUser);

router.route('/login').post(loginUser);

router.route('/logout').post(verifyJWT, logoutUser);

router.route('/refresh-token').post(refreshAccessToken);

router.route('/change-password').post(verifyJWT, changeCurrentPassword);

router.route('/getme').get(verifyJWT, getMe);

router.route('/get-user/:id').get(verifyJWT, getUserById);

router.route('/updateUser').patch(verifyJWT, updateUser);

router.route('/check-password').post(verifyJWT, checkPassword);
export default router;
