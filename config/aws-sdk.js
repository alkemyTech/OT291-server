require('dotenv').config();
const S3 = require('aws-sdk/clients/s3');

const accessKey = process.env.AWS_ACCESS_KEY_ID;
const secretKey = process.env.AWS_SECRET_ACCESS_KEY;
const bucketRegion = process.env.AWS_BUCKET_REGION;

const s3 = new S3({
  accessKey,
  secretKey,
  bucketRegion,
});

module.exports = s3;
