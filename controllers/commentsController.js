const { validationResult } = require('express-validator')

const { Comment } = require('../models/comment.js')
const { Photo } = require('../models/photo.js')

exports.index = (req, res, next) => {
    Comment.find((err, data) => {
        if (err) {
            return next(err)
        }

        let comments = {}

        data.forEach((comment, i) => {
            comments[data[i]._id] = {
                comment: data[i].comment
            }
        })

        res.status(200).send({ comments: comments })
    })
}

exports.add = (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).send({
            errors: errors.array()
        })
    }

    const comment = new Comment({
        comment: req.body.comment
    })

    Photo.findById(req.body.photoId, (err, photo) => {
        if (err) {
            return next(err)
        }

        photo.comments.push(comment)

        photo.save((err) => {
            if (err) {
                return next(err)
            }

            res.status(200).send({ 
                photoId: photo._id,
                comments: {
                    [comment._id]: {
                        comment: req.body.comment
                    }
                }
            })
        })
    })
}
