import userModel from "../models/user.model.js";
import config from "../config/config.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function registerUser(req, res) {
    const { username, password } = req.body;

    const isUserExists = await userModel.findOne({ username });

    if (isUserExists) {
        return res.status(403).json({ message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        password: hashPassword,
    });

    const token = jwt.sign({ id: user.id }, config.JWT_SECRET_KEY);
    res.cookie("token", token);
    res.status(201).json({ user });
}

export async function loginUser(req, res) {
    const { username, password } = req.body;

    const isUserExists = await userModel.findOne({ username });

    if (!isUserExists) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    const isValidPassword = await bcrypt.compare(
        password,
        isUserExists.password
    );

    if (!isValidPassword) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    const token = jwt.sign({ id: isUserExists.id }, config.JWT_SECRET_KEY);

    res.cookie("token", token);
    res.status(200).json({ message: "User loggedIn" });
}
