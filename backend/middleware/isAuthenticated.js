import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
    try {
        const token = req.cookies?.token; // Ensure cookies exist

        if (!token) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY); // No need for await

        req.id = decoded.userId; // Attaching user ID for further use
        console.log(req.id);
        next();
    } catch (error) {
        console.error("Auth Error:", error);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

export default isAuthenticated;

