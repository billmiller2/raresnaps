const { validationResult } = require('express-validator')

const { Photo } = require('../models/photo.js')
const { Tag } = require('../models/tag.js')

exports.index = (req, res, next) => {
    Tag.find((err, data) => {
        if (err) {
            return next(err)
        }

        let tags = {}

        data.forEach((tag, i) => {
            tags[data[i]._id] = {
                name: data[i].name
            }
        })

        res.status(200).send({ tags: tags })
    })
}

exports.add = (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).send({
            errors: errors.array()
        })
    }

    const tagName = req.body.tag.toLowerCase()

    const tag = new Tag({
        name: tagName
    })

    tag.save((err) => {
        if (err) {
            return next(err)
        }

        Photo.findById(req.body.photoId, (err, photo) => {
            if (err) {
                return next(err)
            }

            photo.tags.push(tag)

            photo.save((err) => {
                if (err) {
                    return next(err)
                }

                res.status(200).send({ 
                    photoId: photo._id,
                    tags: {
                        [tag._id]: {
                            name: tagName
                        }
                    }
                })
            })
        })
    })
}

