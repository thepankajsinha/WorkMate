import User from "../models/userModel.js";
import { generateToken } from "../helpers/jwtHelper.js";
import { comparePassword, hashPassword } from "../helpers/bcryptHelper.js";


//api/auth/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if(!email || !password){
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "User not found. Please register." });
    }

    const isPasswordValid = await comparePassword(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const userId = existingUser._id;
    const token = generateToken(userId);


  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });


    const user = await User.findById(existingUser._id).select("-password");

    res.status(200).json({
      message: "Login successful",
      user
    });
  } catch (error) {
    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
};

//api/auth/logout
export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "LogOut failed", error: error.message });
  }
};

//api/auth/me
export const getUserProfile = async (req, res) => {
  try {

    const user = await User.findById(req.user._id).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching profile", error: error.message });
  }
};

//api/auth/me/update
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const { name, email, oldPassword, newPassword } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (name && name !== user.name) {
      user.name = name;
    }

    //update email if changed and not already taken
    if (email && email !== user.email) {
      const emailExist = await User.findOne({ email });

      if (emailExist) {
        return res.status(409).json({
          success: false,
          message: "Email already exists",
        });
      }

      user.email = email;
    }

    // Update Password (need old password)
    if (newPassword) {
      if (!oldPassword) {
        return res.status(400).json({
          success: false,
          message: "Old password is required to update password",
        });
      }

      // match old password from DB
      const isMatch = await comparePassword(oldPassword, user.password);

      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Old password is incorrect",
        });
      }

      // hash new password
      const hashedPassword = await hashPassword(newPassword);
      user.password = hashedPassword;
    }

    await user.save();

    const updatedUser = await User.findById(userId).select("-password");

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

