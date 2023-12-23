const dotenv = require('dotenv').config();
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: process.env.CLIENT_ID,
    secretAccessKey: process.env.SECRET,
});

const uploadFile = (param) => {
    return new Promise((resolve, reject) => {
        try {
            s3.upload({
                Bucket: process.env.Bucket,
                Key: param.Key,
                Body: param.Body,
            }, function (err, data) {
                if (err) {
                    return reject(err);
                }
                if (data) {
                    return resolve(data);
                }
            })

        } catch (err) {
            return reject(err);
        }
    })
}



module.exports = uploadFile;

