const { body } = require('express-validator')

exports.add = addCommentValidator = [
    body('comment').not().isEmpty().escape().trim()
]
