const AWS = require("aws-sdk");
const fs = require("fs");
const { logger } = require("../logging/logger");
const { AppConfig } = require("../application");

const region = "ap-south-1";

class AmazonS3Client {
    constructor(bucketName) {

        const { s3AccessKey, s3SecretKey } = AppConfig.getAwsCreds();
        logger.debug(`S3creds: ${s3AccessKey} and Secret: ${s3SecretKey}`);

        if (!s3AccessKey || !s3SecretKey) {
            logger.error(` Error in s3 creds : ${JSON.stringify(AppConfig.getAwsCreds())}`);
            throw new Error(`Error in s3 creds while creating client`);
        }
        this.s3Client = new AWS.S3({
            accessKeyId: s3AccessKey,
            secretAccessKey: s3SecretKey,
            region: region
        })

        this.bucketName = bucketName;

        logger.info("Initialized S3 instance");
    }

    writeS3CredsToFile(accessKeyId, secretAccessKey, region, tmpFile) {
        const configDetails = { accessKeyId: `${accessKeyId}`, secretAccessKey: `${secretAccessKey}`, region: `${region}` };
        const data = JSON.stringify(configDetails);
        const filePath = tmpFile;
        fs.writeFileSync(filePath, data);
        return filePath;
    }

    async upload(name, filePath, ContentType, extraArgs) {
        logger.debug(`uploading file ${filePath} at s3 location [${this.bucketName}] ${name}`);
        // Configure the file stream and obtain the upload parameters
        const fileStream = fs.createReadStream(filePath);
        fileStream.on('error', function (err) { throw new Error(err); });

        // call S3 to retrieve upload file to specified bucket
        const uploadParams = {
            ...extraArgs,
            Bucket: this.bucketName,
            Key: name,
            Body: fileStream,
            ContentType: ContentType
        };

        // call S3 to retrieve upload file to specified bucket
        logger.debug(`uploading file to s3 with params : ${JSON.stringify(uploadParams)}`);

        const response = await this.uploadToS3Process(uploadParams, filePath);

        return response;
    };

    async uploadToS3Process(uploadParams, filePath) {
        return new Promise((resolve, reject) => {
            this.s3Client.upload(uploadParams, async (s3Error, data) => {
                if (data) {
                    logger.info(`Upload Success for file ${filePath} at ${JSON.stringify(data)}`);
                    const { Location, Key, Bucket } = data;
                    const response = {
                        s3Url: `s3://${Bucket}/${Key}`,
                        publicUrl: Location,
                        url: Location,
                    };
                    resolve(response);
                } else {
                    logger.error(`error while uploading file ${filePath} : ${s3Error}`);
                    reject(new Error(`error while uploading file ${filePath} : ${s3Error}`));
                }
            });
        })
    }

    async downloadFile(s3Path) {
        return new Promise((resolve, reject) => {
            this.s3Client.getObject(
                {
                    Bucket: this.bucketName,
                    Key: s3Path.replace(`s3://${this.bucketName}/`, ""),
                },
                async (s3Error, data) => {
                    if (data) {
                        resolve(data);
                    } else {
                        logger.error(`error while get file: ${s3Error}`);
                        reject(s3Error);
                    }
                }
            );
        });
    }

    async downloadFileToFilePath(s3Path, filePath) {
        return new Promise(async (resolve, reject) => {
            const data = await this.downloadFile(s3Path);
            if (data) {
                let objectData = data.Body.toString('utf-8');
                fs.writeFileSync(filePath, objectData);
                resolve(filePath);
            }
            else {
                logger.error(`error while downloading file to the file path : ${filePath}`);
                reject(new Error(`error while downloading file to the file path : ${filePath}`));
            };
        });
    }
}

module.exports = AmazonS3Client;