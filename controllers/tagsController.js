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
            tags[data[i]._id] = data[i]
        })

        res.status(200).send({ tags: tags })
    })
}

exports.search = (req, res, next) => {
    Tag.findOne({ name: req.params.name.toLowerCase() }, (err, tag) => {
        if (err) {
            return next(err)
        }

        if (!tag) {
            return res.status(200).send({
                tag: ''
            })
        }

        return res.status(200).send({
            tagId: tag._id
        })
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

    const newTag = new Tag({
        name: tagName
    })

    Tag.findOne({ name: tagName }, (err, existing) => {
        const findPhotoAndSendResponse = (tag) => {
            Photo.findById(req.body.photoId, (err, photo) => {
                if (err) {
                    return next(err)
                }

                if (!photo.tags.includes(tag._id)) {
                    photo.tags.push(tag)

                    photo.save((err) => {
                        if (err) {
                            return next(err)
                        }

                        res.status(200).send({ 
                            photoId: photo._id,
                            tags: {
                                [tag._id]: tag
                            }
                        })
                    })
                } else {
                    res.status(200).send({ 
                        photoId: photo._id,
                        tags: {}
                    })
                }
            })
        }

        if (existing) {
            findPhotoAndSendResponse(existing)
        } else {
            newTag.save((err) => {
                if (err) {
                    return next(err)
                }

                findPhotoAndSendResponse(newTag)
            })
        }
    })
}

exports.tagOfDay = (req, res, next) => {
    Tag.findOne({ isTagOfDay: true }, (err, tag) => {
        if (err) {
            return next(err)
        }

        const setTagOfDay = () =>
            Tag.findOne((err, tagOfDay) => {
                tagOfDay.isTagOfDay = true

                tagOfDay.save((err) => {
                    if (err) {
                        return next(err)
                    }

                    return res.status(200)
                })
            })
        
        if (tag) {
            tag.isTagOfDay = false;

            tag.save((err) => {
                if (err) {
                    return next(err)
                }

                setTagOfDay()

            })
        } else {
            setTagOfDay()
        }
    })
}

