const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
	try {
		const { name, email, password, phone } = req.body;
		if (!name || !email || !password) {
			return res.status(400).json({ message: "Name, email and password are required" });
		}

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: "Email already registered" });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({ name, email, password: hashedPassword, phone });
		await newUser.save();

		const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY || "secret", { expiresIn: "2h" });

		const userObj = newUser.toObject();
		delete userObj.password;

		return res.status(201).json({
			message: "User registered successfully",
			token,
			user: userObj,
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({ message: "Email and password are required" });
		}

		const foundUser = await User.findOne({ email });
		if (!foundUser) {
			return res.status(400).json({ message: "User not found" });
		}

		const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);
		if (!isPasswordCorrect) {
			return res.status(401).json({ message: "Incorrect email or password" });
		}

		const token = jwt.sign({ id: foundUser._id }, process.env.SECRET_KEY || "secret", { expiresIn: "2h" });

		const userObj = foundUser.toObject();
		delete userObj.password;

		return res.status(200).json({
			message: "Login successful",
			token,
			user: userObj,
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

module.exports = { register, login };
