import { ROSCAGroup } from '../models/roscaGroup.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { AppError } from '../utils/appError.js';

// Create a new ROSCA group
export const createGroup = async (req, res) => {
  try {
    const newGroup = new ROSCAGroup({ ...req.body });

    await newGroup.save();
    res
      .status(201)
      .json(new ApiResponse(201, newGroup, 'ROSCA group created successfully'));
  } catch (error) {
    res
      .status(500)
      .json(new AppError('Error creating ROSCA group', error.message, 500));
  }
};

// Get all ROSCA groups
export const getAllGroups = async (req, res) => {
  try {
    const groups = await ROSCAGroup.find();
    res.status(200).json(groups);
  } catch (error) {
    res
      .status(500)
      .json(new AppError('Error retrieving ROSCA groups', error.message, 500));
  }
};

// Get a single ROSCA group by ID
export const getGroupById = async (req, res) => {
  try {
    const group = await ROSCAGroup.findById(req.params.id);
    if (!group)
      return res.status(404).json({ message: 'ROSCA group not found' });

    res.status(200).json(group);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving ROSCA group', error: error.message });
  }
};

// Update a ROSCA group
export const updateGroup = async (req, res) => {
  try {
    const updatedGroup = await ROSCAGroup.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedGroup)
      return res.status(404).json({ message: 'ROSCA group not found' });

    res.status(200).json({
      message: 'ROSCA group updated successfully',
      group: updatedGroup,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error updating ROSCA group', error: error.message });
  }
};

// Delete a ROSCA group
export const deleteGroup = async (req, res) => {
  try {
    const deletedGroup = await ROSCAGroup.findByIdAndDelete(req.params.id);
    if (!deletedGroup)
      return res.status(404).json({ message: 'ROSCA group not found' });

    res.status(200).json({ message: 'ROSCA group deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting ROSCA group', error: error.message });
  }
};

// Add a contribution to a ROSCA group
export const addContribution = async (req, res) => {
  try {
    const { memberId, amount } = req.body;
    const group = await ROSCAGroup.findById(req.params.id);

    if (!group)
      return res.status(404).json({ message: 'ROSCA group not found' });

    // Check if member is in the group
    if (!group.members.includes(memberId)) {
      return res
        .status(400)
        .json({ message: 'Member is not part of this ROSCA group' });
    }

    // Add contribution record
    group.contributions.push({ memberId, amount, date: new Date() });
    await group.save();

    res.status(200).json({ message: 'Contribution added successfully', group });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error adding contribution', error: error.message });
  }
};
