const {check, validationResult} = require("express-validator")

exports.registerValidation = () => [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is not valid").isEmail(),
    check("password", "Password must be between 6 and 15 characters").isLength({ min: 6, max: 15 }),
];

exports.loginValidation = () => [
    check("email", "Email is not valid").isEmail(),
    check("password", "Password must be between 6 and 15 characters").isLength({ min: 6, max: 15 }),
];

exports.validation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};