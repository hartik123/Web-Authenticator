const jwt = require('jsonwebtoken');
const userAccounts = require('../data/user.data.js');
const authService = require('../services/auth.service.js');


exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const result = await authService.signup({ name, email, password });

        return res.status(201).json({
            message: "User created Successfully",
            ...result
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Please enter both email and password"
            });
        }

        const result = await authService.login({ email, password });

        return res.status(200).json({
            message: "Login successful",
            ...result
        });
    }
    catch (error) {
        return res.status(401).json({
            message: error.message
        })
    }

}


exports.refresh = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(401).json({
                message: "Refresh token required"
            })
        }

        const decoded = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET
        );

        const user = userAccounts.find(user => user._id === decoded.id);

        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }

        // Issuing new Access Token
        const newAccessToken = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        )

        return res.status(200).json({
            token: newAccessToken
        })

    }
    catch (error) {
        return res.status(403).json({
            message: "Expired or invalid refresh token"
        })
    }
}

exports.logout = (req, res) => {
    const { refreshToken } = req.body;
    const user = userAccounts.find(u => u.refreshToken === refreshToken);
    if (user) {
        user.refreshToken = null;
    }
    res.status(200).json({
        message: "Logged out Successfully"
    })
}