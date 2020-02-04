const { check, validationResult } = require('express-validator');
const message=require('../common/message');
const constants=require('../common/constants')
const userSignUpValidation = () => {
    return [
        check(constants.USERNAME, message.USER_NAME_REQUIRED).exists().isLength({ min: 3 }),
        check(constants.EMAIL, message.EMAIL_REQUIRED).exists().isEmail().withMessage(message.INVALID_EMAIL),
        check(constants.PASSWORD, message.PASSWORD_REQUIRED).exists().isLength({ min: 8 }).withMessage(message.PASSWORD_MORE_CHAR),
    ]

}
const userLoginValidation = () => {
    return [
        check(constants.EMAIL, message.EMAIL_REQUIRED).exists().isEmail().withMessage(message.INVALID_EMAIL),
        check(constants.PASSWORD, message.PASSWORD_REQUIRED).exists().isLength({ min: 8 }).withMessage(message.PASSWORD_MORE_CHAR),
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors,
    })
}
module.exports={
    validate,
    userSignUpValidation,
    userLoginValidation
}