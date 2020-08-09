const aws = require('aws-sdk');
const s3 = new aws.S3();
const { Photo } = require('../models/photo.js')

exports.index = (req, res, next) => {
    const listParams = {
        Bucket: 'dev-raresnaps',
        // MaxKeys: 10
    }

    let photos = []

    s3.listObjectsV2(listParams, function(err, data) {
        if (err) {
            return next(err)
        }

        let getParams = {
            Bucket: 'dev-raresnaps',
        }

        const photoCount = data.Contents.length

        for (let i = 0; i < photoCount; i++) {
            getParams.Key = data.Contents[i].Key

            s3.getObject(getParams, function(err, data) {
                if (err) {
                    return next(err)
                }

                photos.push(data.Body.toString('base64'))

                if (photos.length === photoCount) {
                    res.status(200).send({ photos: photos })
                }
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
            let response = { photo: objectData }

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
