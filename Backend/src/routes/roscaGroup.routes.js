import { Router } from 'express';
import {
  createGroup,
  getAllGroups,
  getGroupById,
  updateGroup,
  deleteGroup,
  addContribution,
} from '../controllers/roscaGroup.controller.js';

const router = Router();

// Define ROSCA group routes
router.post('/create-group', createGroup);
router.get('/get-all-groups', getAllGroups);
router.get('/get-group/:id', getGroupById);
router.put('/update-group/:id', updateGroup);
router.delete('/delete-group/:id', deleteGroup);
router.post('/contribute/:id', addContribution);

export default router;
