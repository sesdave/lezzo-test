const aws = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

class S3Service {
  constructor() {
    // Set up AWS S3 client
    this.s3 = new aws.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });
  }

  static async uploadImage(logoFile, contentType) {
    try {
      const logoKey = `store-logos/${uuidv4()}-logo.png`; 
      const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: logoKey,
        Body: logoFile
      };
      await this.s3.upload(params).promise();

      return `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${logoKey}`;
    } catch (error) {
      console.log("Error uploading logo to S3", error)
    }
  }
}

module.exports = S3Service;
