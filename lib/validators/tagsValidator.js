const { body } = require('express-validator')

exports.add = addTagValidator = [
    body('tag').not().isEmpty().escape().trim()
]
