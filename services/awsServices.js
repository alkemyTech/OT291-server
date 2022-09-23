require('dotenv').config();
const s3 = require('../config/aws-sdk'); // Helper function that creates an Amazon S3 service client module.
const fs = require('fs');
const bucketName = process.env.AWS_BUCKET_NAME;

// Call S3 to list the buckets
class sdkS3 {
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
      res.status(400).json(error);
    }
  }
}

module.exports = sdkS3;
