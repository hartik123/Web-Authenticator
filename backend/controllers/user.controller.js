

exports.getMe = async (req, res) => {
    try {

        return res.status(200).json({
            user: req.user
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "Server error"
        })
    }
};
