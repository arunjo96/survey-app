import User from "../models/User.js";
import generateToken from "../utils/Token.js";



export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await User.findOne({ email });
        // console.log(user);
        if (user) {
            return res.status(400).json({
                status: "Error",
                message: "User already exists with this email"
            });
        }

        const newUser = await User.create({ name, email, password });
        const token = generateToken({ id: newUser.id });

        

        res.status(201).json({
            status: "Success",
            message: "User created successfully",
       
            token
        });
    } catch (error) {
        res.status(500).json({
            status: "Error",
            message: error.message || "Server error"
        });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({
                status: "Error",
                message: "Invalid Credentials"
            });
        }

        // console.log(user);

        const token = generateToken({ id: user.id, role: user.role });
        res.status(200).json({
            status: "Success",
            message: "User logged in successfully",
            user,
            token
        });
    } catch (error) {
        res.status(500).json({
            status: "Error",
            message: error.message || "Server error"
        });
    } 
};


