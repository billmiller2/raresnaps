const { Photo } = require('../models/photo.js')
const { Tag } = require('../models/tag.js')

exports.add = (req, res, next) => {
    const tag = new Tag({
        name: req.body.tag
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
                req.session.sessionFlash = [{
                    type: 'alert-success',
                    message: 'Tag added'
                }]

                res.status(200).send({ tags: {
                    [tag._id]: {
                        name: req.body.tag
                    }
                }})
            })
        })
    })
}
