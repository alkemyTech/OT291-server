const AWS = require('aws-sdk');
require('dotenv').config();
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1',
  apiVersion: '2006-03-01',
  signatureVersion: 'v4',
});

const s3Bucket = new AWS.S3({
  params: { Bucket: 'cohorte-septiembre-5efe33c6' },
});

module.exports = s3Bucket;


