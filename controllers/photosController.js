const aws = require('aws-sdk');
const s3 = new aws.S3();
const { Photo } = require('../models/photo.js')

exports.index = (req, res, next) => {
    let photos = {}
    let where = {}

    if (req.query.since) {
        where = {
            createdAt: {
                $lt: new Date(req.query.since)
            }
        }
    }

    Photo
        .find(where)
        .sort({ createdAt: 'desc' })
        .limit(6)
        .exec((err, data) => {
            if (err) {
                return next(err)
            }

            const getParams = {
                Bucket: 'dev-raresnaps',
            }

            const photoCount = data.length

            if (photoCount) {
                const since = data[photoCount - 1].createdAt
                console.log(data)

                for (let i = 0; i < photoCount; i++) {
                    const photoId = data[i]._id

                    getParams.Key = data[i].key

                    s3.getObject(getParams, function(err, data) {
                        if (err) {
                            return next(err)
                        }

                        photos[photoId] = {
                            data: data.Body.toString('base64')
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
                    photos: [],
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
                        data: objectData
                    }
                }
            }

            res.status(200).send(response)
        })
    })
}

exports.add = (req, res, next) => {
    const params = {
        Body: Buffer.from(req.file.buffer, 'binary'),
        Bucket: 'dev-raresnaps',
        Key: req.file.originalname
    }

    s3.putObject(params, function(err, data) {
        if (err) {
            return next(err)
        }

        const photo = new Photo({
            key: req.file.originalname
        })

        photo.save((err) => {
            if (err) {
                next(err)
            }

            req.session.sessionFlash = [{
                type: 'alert-success',
                message: 'Photo added'
            }]

            // res.redirect(303, '/')
        })
    })

    res.status(200).send({ photo: req.file.originalname })
}
