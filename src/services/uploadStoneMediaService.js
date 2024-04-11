const MysqlConnector = require("../dbaccessor/connector/mysqlConnector");
const { logger } = require("../logging/logger");
const constants = require("../utils/constants");
const randomstring = require("randomstring");
const AmazonS3Client = require("../thirdparty/amazonS3Client");

const modelName = constants.MODEL.TRN_STONE;
const s3BucketName = "diamview360";

class UploadStoneMediaService {
    constructor() {
        this.s3Client = new AmazonS3Client(s3BucketName);
    }

    async uploadStoneMedia(clientId, stoneId, files) {
        let response = {};
        try {
            const fetchCount = await MysqlConnector.count(modelName, {
                where: {
                    clientId: clientId,
                    stoneId: stoneId
                }
            })
            if (fetchCount == 0) { 
                response["message"] = "Stone with given stoneId and clientId doesn't exist";
                return response;
            }
            const uploadResult = await this.uploadToS3(clientId, stoneId, files);
            const mysqlResponse = await MysqlConnector.update(
                modelName,
                {
                    ...uploadResult
                },
                {
                    where: { clientId: clientId, stoneId :stoneId}
                }
            );
            if (mysqlResponse
                && Array.isArray(mysqlResponse)
                && mysqlResponse.length > 0
                && mysqlResponse[0]!=0
            ) {
                response = uploadResult;
            }
            logger.debug(`uploadStoneMedia response ${JSON.stringify(uploadResult)}`);
        } catch (err) {
            logger.error(
                `Error in uploadStoneMedia service for user ${clientId} error :${err}`
            );
            response['message']= "Upload stone media request failed."
        }
        return response;
    }

    async uploadToS3(clientId, stoneId, files) {
        logger.info(`Upload media for user: ${clientId} and stone: ${stoneId}`);

        const uploadPaths = {}
        const { video=[], photo=[] } = files;

        const uploadContent = [...video, ...photo];
        const uploadPromise = [];

        uploadContent.forEach((media, index) => {
            logger.info(`Media local file path : ${media.path} with name ${media.originalname}`);

            let prefix = "video";
            if (media.fieldname === 'photo') {
                prefix = `photo_${index}`;
            }
            const s3FilePath =
                this.createUploadS3Urls(clientId, stoneId, media.originalname, prefix);
            logger.info(`Created s3 file path for media: ${s3FilePath}`);

            uploadPromise.push(
                this.s3Client.upload(
                    s3FilePath,
                    media.path,
                    media.mimetype
                )
            )
        });

        const promiseResult = await Promise.all(uploadPromise);
        uploadPaths["videoLink"] = promiseResult[0].publicUrl

        for (let i = 1; i < promiseResult.length; i++) {
            uploadPaths[`photoLink${i}`] = promiseResult[i].publicUrl;
        }

        logger.info(`uploadPaths result s3 ${JSON.stringify(uploadPaths)}`);
        return uploadPaths;
    }

    createUploadS3Urls(clientId, stoneId, filename, prefix) {
        return `mst-stone-videos/${clientId}/${stoneId}/` +
            `${prefix}_${stoneId.toLowerCase()}_${randomstring.generate(6)}_${filename}`
    }
}

module.exports = new UploadStoneMediaService();