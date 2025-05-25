import User from "../model/userModel";

export const updatePhoneNumberController = async (req: any, res: any) => {
  try {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
      return res.status(400).json({ message: "No phone number" });
    }

    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.phoneNumber = phoneNumber;
    await user.save();
    return res
      .status(200)
      .json({ message: "Phone number updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
