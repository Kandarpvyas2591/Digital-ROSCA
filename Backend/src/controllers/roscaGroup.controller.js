import { ROSCAGroup } from '../models/roscaGroup.model.js';
import { User } from '../models/user.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Create a new ROSCA group
export const createGroup = asyncHandler(async (req, res) => {
  try {
    const newGroup = new ROSCAGroup({ ...req.body });
    // newGroup.admin = req.user._id;

    await newGroup.save();
    res
      .status(201)
      .json(new ApiResponse(201, newGroup, 'ROSCA group created successfully'));
  } catch (error) {
    res.status(500).json(new ApiError(error.message, 500, error));
  }
});

// Get all ROSCA groups
export const getAllGroups = asyncHandler(async (req, res) => {
  try {
    const groups = await ROSCAGroup.find();
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json(new ApiError(error.message, 500, error));
  }
});

// Get a single ROSCA group by ID
export const getGroupById = asyncHandler(async (req, res) => {
  try {
    const group = await ROSCAGroup.findById(req.params.id).populate({
      path: 'members',
      select: 'username email',
    });
    if (!group)
      return res
        .status(404)
        .json(new ApiError('ROSCA group not found', null, 404));

    res.status(200).json(group);
  } catch (error) {
    res.status(500).json(ApiResponse(error.message, 500, error));
  }
});

// Update a ROSCA group
export const updateGroup = asyncHandler(async (req, res) => {
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
});

// Delete a ROSCA group
export const deleteGroup = asyncHandler(async (req, res) => {
  try {
    const deletedGroup = await ROSCAGroup.findByIdAndDelete(req.params.id);
    if (!deletedGroup)
      return res.status(404).json({ message: 'ROSCA group not found' });

    res.status(200).json({ message: 'ROSCA group deleted successfully' });
  } catch (error) {
    res.status(500).json(new ApiError(500, error.message, error));
  }
});

// Add a contribution to a ROSCA group
// export const addContribution = asyncHandler(async (req, res) => {
//   try {
//     const { memberId, amount } = req.body;
//     const group = await ROSCAGroup.findById(req.params.id);

//     if (!group)
//       return res.status(404).json({ message: 'ROSCA group not found' });

//     // Check if member is in the group
//     if (!group.members.includes(memberId)) {
//       return res
//         .status(400)
//         .json({ message: 'Member is not part of this ROSCA group' });
//     }

//     // Add contribution record
//     group.contributions.push({ memberId, amount, date: new Date() });
//     await group.save();

//     res.status(200).json({ message: 'Contribution added successfully', group });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: 'Error adding contribution', error: error.message });
//   }
// });

export const addMember = asyncHandler(async (req, res) => {
  try {
    const { memberId } = req.user._id;
    const group = await ROSCAGroup.findById(req.params.id);
    const user = await User.findById(memberId);

    if (!group)
      return res
        .status(404)
        .json(new ApiError('ROSCA group not found', null, 404));

    // Check if member is already in the group
    if (group.members.includes(memberId)) {
      return res.status(400).json(new ApiError(error.message, 500, error));
    }

    if (group.members.length >= group.maxMembers) {
      return res.status(400).json(new ApiError(error.message, 500, error));
    }

    if (!user) {
      return res.status(404).json(new ApiError('User not found', null, 404));
    }

    if (user.joinedGroups.includes(req.params.id)) {
      return res
        .status(400)
        .json(
          new ApiError('User is already part of this ROSCA group', null, 400)
        );
    }

    user.joinedGroups.push(req.params.id);
    await user.save();

    // Add member to group
    group.members.push(memberId);
    await group.save();

    res
      .status(200)
      .json(new ApiResponse(200, group, 'Member added successfully'));
  } catch (error) {
    res.status(500).json(new ApiError(error.message, 500, error));
  }
});
