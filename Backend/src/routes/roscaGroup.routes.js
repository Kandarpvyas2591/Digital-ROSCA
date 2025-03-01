import { Router } from 'express';
import {
  createGroup,
  getAllGroups,
  getGroupById,
  updateGroup,
  deleteGroup,
  // addContribution,
  addMember,
} from '../controllers/roscaGroup.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

// Define ROSCA group routes
router.post('/create-group', verifyJWT, createGroup);
router.get('/get-all-groups', getAllGroups);
router.get('/get-group/:id', getGroupById);
router.patch('/update-group/:id', verifyJWT, updateGroup);
router.delete('/delete-group/:id', verifyJWT, deleteGroup);
// router.post('/contribute/:id', addContribution);
router.post('/add-member/:id', verifyJWT, addMember);

export default router;
