const aws = require('aws-sdk');
const s3 = new aws.S3();

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
    const getParams = {
        Bucket: 'dev-raresnaps',
        Key: 'IMG_1610.JPG'
    }

    s3.getObject(getParams, function(err, data) {
        if (err) {
            return err
        }

        let objectData = data.Body.toString('base64')
        let response = { photo: objectData }

        res.status(200).send(response)
    })
}

exports.add = (req, res, next) => {
    console.log(req.file)

    res.status(200).send({ photo: 'asfd' })
}
