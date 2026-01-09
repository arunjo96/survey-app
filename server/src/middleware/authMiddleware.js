import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
    const authString = req.headers.authorization;
    if (!authString || !authString.startsWith("Bearer ")) {
        return res.status(401).json({
            status: "Error",
            message: "Invalid Token"
        });
    }

    const token = authString.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            status: "Error",
            message: "Token is invalid or expired"
        });
    }
};