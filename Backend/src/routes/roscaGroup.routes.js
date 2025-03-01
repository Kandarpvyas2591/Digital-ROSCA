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

const router = Router();

// Define ROSCA group routes
router.post('/create-group', createGroup);
router.get('/get-all-groups', getAllGroups);
router.get('/get-group/:id', getGroupById);
router.patch('/update-group/:id', updateGroup);
router.delete('/delete-group/:id', deleteGroup);
// router.post('/contribute/:id', addContribution);
router.post('/add-member/:id', addMember);

export default router;
