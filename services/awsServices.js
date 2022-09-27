require('dotenv').config();
const s3 = require('../config/aws-sdk');
const fs = require('fs');
const bucketName = process.env.AWS_BUCKET_NAME;

class SdkS3 {
  static testBucket() {
    s3.listBuckets(function (err, data) {
      try {
        console.log('Success', data.Buckets);
      } catch (error) {
        console.log('Error', err);
      }
    });
  }

  /**
   * Return the object path of the image
   * @param {Object} file - { filename: 'prueba.txt', path: 'files/prueba.txt' }
   * @returns {Object}
   */
  static uploadFile(file) {
    try {
      const fileStream = fs.createReadStream(file.path);

      const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename,
      };

      return s3.upload(uploadParams).promise();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = SdkS3;
