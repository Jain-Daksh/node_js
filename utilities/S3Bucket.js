const aws = require('aws-sdk');

const S3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESSKEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESSKEY,
  region: process.env.S3_BUCKET_REGION,
});

const S3_UPLOAD = (fileData) => new Promise((resolve, reject) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${resolve.user_id + Date.now().toString()}.jpg`,
    Body: fileData,
  };
  S3.upload(params, (err, data) => {
    if (err) {
      return reject(err);
    }
    return resolve(data);
  });
});

module.exports = {
  S3_UPLOAD,
};
