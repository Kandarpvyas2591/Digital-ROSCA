import { ROSCAGroup } from "../models/roscaGroup.model";
import { User } from "../models/user.model";
import { ApiError } from "../utils/apiError";
import { asyncHandler } from "../utils/asyncHandler";

export const createTransaction = asyncHandler(async(req, res) => {
    try {
        const { type, sender, senderType, receiver, receiverType, amount } = req.body;

        if (amount <= 0) {
            return res.status(400)
            .json(new ApiError('Amount must be greater than 0', null, 400));
        }

        const senderEntity = senderType === "User" ? await User.findById(sender) : await ROSCAGroup.findById(sender);
        if (!senderEntity) {
            return res.status(404).json({ message: `Sender (${senderType}) not found` });
        }
    } catch (error) {
        
    }
})