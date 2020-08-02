const aws = require('aws-sdk');
const s3 = new aws.S3();

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

        res.send(200, objectData)
    })
}
