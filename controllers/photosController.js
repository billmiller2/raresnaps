const aws = require('aws-sdk');
const s3 = new aws.S3();
const { Photo } = require('../models/photo.js')
const ExifImage = require('exif').ExifImage

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
                const createdAt = data[i].createdAt

                getParams.Key = data[i].key + '-sm'

                s3.getObject(getParams, function(err, data) {
                    if (err) {
                        return next(err)
                    }

                    photos[photoId] = {
                        comments,
                        createdAt,
                        data: data.Body.toString('base64'),
                        originalCreatedDate: '',
                        tags
                    }

                    if (Object.keys(photos).length === photoCount) {
                        const sorted = {}

                        Object.keys(photos).sort().reverse().forEach(key =>
                            sorted[key] = photos[key]
                        )

                        res.status(200).send({ 
                            photos: sorted,
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
            Bucket: process.env.ENVIRONMENT === 'production' ? 'raresnaps' : 'dev-raresnaps',
            Key: photo.key
        }

        s3.getObject(getParams, function(err, data) {
            if (err) {
                return err
            }

            new ExifImage({ image: data.Body }, function(err, exifData) {
                let originalCreatedDate = ''

                if (exifData && typeof exifData.exif.DateTimeOriginal !== 'undefined') {
                    originalCreatedDate = exifData.exif.DateTimeOriginal
                }

                let objectData = data.Body.toString('base64')
                let response = { 
                    photos: {
                        [photo._id]: {
                            comments: photo.comments,
                            createdAt: photo.createdAt,
                            data: objectData,
                            originalCreatedDate,
                            tags: photo.tags
                        }
                    }
                }

                res.status(200).send(response)
            })
        })
    })
}

exports.add = (req, res, next) => {
    const key = (+new Date()).toString()
    let params = {
        Body: Buffer.from(req.file.buffer, 'binary'),
        Bucket: process.env.ENVIRONMENT === 'production' ? 'raresnaps' : 'dev-raresnaps',
        Key: key
    }
    const fullSize = params.Body

    s3.putObject(params, function(err, data) {
        if (err) {
            return next(err)
        }

        const sharp = require('sharp')

        sharp(fullSize)
            .resize(400)
            .withMetadata()
            .toBuffer()
            .then(data => {
                params.Key = key + '-sm'
                params.Body = data

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
                                data: fullSize.toString('base64'),
                                originalCreatedDate: '',
                                tags: []
                            }
                        }})
                    })

                })
            })
            .catch(err => console.log(err))
    })
}
