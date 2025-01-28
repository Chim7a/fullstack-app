import { UserModel } from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (validator.isEmpty(name, { ignore_whitespace: true }) === true) {
    return res
      .status(400)
      .json({ message: "Please provide your name", status: "Failed" });
  }

  if (validator.isEmail(email) === false) {
    return res
      .status(400)
      .json({ message: "Please provide your email", status: "Failed" });
  }

  if (
    validator.isStrongPassword(password, {
      minLength: 6,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1,
    }) === false
  ) {
    return res
      .status(400)
      .json({ message: "Please provide strong password", status: "Failed" });
  }

  //   register user if above conditions are met.

  // For strong password that are not visible in database.
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    const user = await UserModel.create({
      name: name,
      password: hashPassword,
      email: email,
    });
    res
      .status(200)
      .json({ data: "User registered succefully", status: "success" });
  } catch (error) {
    res.status(400).json({ message: error.message, status: "Failed" });
  }
};

// Login user

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (validator.isEmail(email) === false) {
    return res
      .status(400)
      .json({ message: "Please provide your email", status: "Failed" });
  }

  if (
    validator.isStrongPassword(password, {
      minLength: 6,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1,
    }) === false
  ) {
    return res
      .status(400)
      .json({ message: "Please provide strong password", status: "Failed" });
  }

  try {
    // Check if user with email exist
    const user = await UserModel.findOne({ email: email });

    if (user === null) {
      return res
        .status(400)
        .json({ message: "No account found with:" + email });
    }

    // check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (isPasswordCorrect === false) {
      return res
        .status(400)
        .json({ message: "Email or password incorrect", status: "Failed" });
    }

    // To not send password info to frontend
    user.password = undefined;
    res.status(200).json({ data: user, status: "success" });
  } catch (error) {
    res.status(400).json({ message: error.message, status: "Failed" });
  }
};

export { registerUser, loginUser };
