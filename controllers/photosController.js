const aws = require('aws-sdk');
const s3 = new aws.S3();
const { Photo } = require('../models/photo.js')

exports.index = (req, res, next) => {
    let photos = {}
    let where = {}

    if (req.query.since) {
        where.createdAt = {
            $lt: new Date(req.query.since)
        }
    }

    if (req.query.tags) {
        where.tags = {
            $all: req.query.tags
        }
    }

    let query = Photo.find(where).sort({ createdAt: 'desc' }).limit(6)

    query.exec((err, data) => {
        if (err) {
            return next(err)
        }

        const getParams = {
            Bucket: process.env.ENVIRONMENT === 'production' ? 'raresnaps' : 'dev-raresnaps'
        }

        const photoCount = data.length

        if (photoCount) {
            const since = data[photoCount - 1].createdAt

            for (let i = 0; i < photoCount; i++) {
                const photoId = data[i]._id
                const comments = data[i].comments
                const tags = data[i].tags

                getParams.Key = data[i].key

                s3.getObject(getParams, function(err, data) {
                    if (err) {
                        return next(err)
                    }

                    photos[photoId] = {
                        comments: comments,
                        data: data.Body.toString('base64'),
                        tags: tags
                    }

                    if (Object.keys(photos).length === photoCount) {
                        res.status(200).send({ 
                            photos: photos,
                            since: since
                        })
                    }
                })
            }
        } else {
            res.status(200).send({
                photos: {},
                since: ''
            })
        }
    })
}

exports.show = (req, res, next) => {
    Photo.findById(req.params.id, (err, photo) => {
        if (err) {
            return next(err)
        }

        if (!photo) {
            return res.status(200).send({
                photo: ''
            })
        }

        const getParams = {
            Bucket: 'dev-raresnaps',
            Key: photo.key
        }

        s3.getObject(getParams, function(err, data) {
            if (err) {
                return err
            }

            let objectData = data.Body.toString('base64')
            let response = { 
                photos: {
                    [photo._id]: {
                        comments: photo.comments,
                        data: objectData,
                        tags: photo.tags
                    }
                }
            }

            res.status(200).send(response)
        })
    })
}

exports.add = (req, res, next) => {
    const key = (+new Date()).toString()
    const params = {
        Body: Buffer.from(req.file.buffer, 'binary'),
        Bucket: 'dev-raresnaps',
        Key: key
    }

    s3.putObject(params, function(err, data) {
        if (err) {
            return next(err)
        }

        const photo = new Photo({
            key: key
        })

        photo.save((err) => {
            if (err) {
                return next(err)
            }

            res.status(200).send({ photos: {
                [photo._id]: {
                    data: params.Body.toString('base64'),
                    tags: []
                }
            }})
        })
    })
}
