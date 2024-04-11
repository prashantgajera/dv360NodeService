const { AppConfig } = require("../../application");
const { logger } = require("../../logging/logger");
const { Sequelize } = require("sequelize");
const { Models } = require("../models/mysql");

class MysqlConnector {

    static async connect() {
        try {
            const mysqlConfig = AppConfig.getMysqlConfig()
            await this.connectAndSetClient(mysqlConfig, true);  /* isRetriable */
            this.registerModels(Models);
        } catch (dbError) {
            console.trace();
            logger.error(
                `unable to connect with mysql - ${dbError.message} : ${dbError.stack}`,
            );
            process.exit(2);
        }
    }

    /**
       * Sample credential object
       * {
       *     "database": "database_name",
       *     "username": "root",
       *     "password": "sok123",
       *     "options": {
       *         "dialect": "mysql",
       *         "host": "127.0.0.1",
       *         "port": 3306,
       *         "pool": {
       *             "max": 5,
       *             "min": 0,
       *             "acquire": 30000,
       *             "idle": 10000
       *         }
       *     }
       * }
       */


    static async connectAndSetClient(credential, isRetriable = false) {
        try {
            const { database, username, password, options } = credential;

            /* Checkout about retires in sequilize 
                https://dev.to/anonyma/how-to-retry-transactions-in-sequelize-5h5c 
            */
            const mysqlRetryconfig = {
                match: [
                    Sequelize.ConnectionError,
                    Sequelize.ConnectionTimedOutError,
                    Sequelize.TimeoutError,
                    'SQLITE_BUSY'
                ],
                max: 3
            }
            /* retry is optional */
            if (isRetriable) {
                options.retry = mysqlRetryconfig;
            }

            const sequelize = new Sequelize(database, username, password, options);
            await sequelize.authenticate();
            this.client = sequelize;
        } catch (dbError) {
            const errorMessage = `unable to connect with mssql - ${dbError.message} : ${dbError.stack}`;
            this.logger.error(errorMessage);
            throw new Error(errorMessage);
        }
    }

    static getClient() {
        return this.client;
    }

    static getModel(modelName) {
        return this.client.model(modelName);
    }


    static registerModel(name, schema, options) {
        this.client.define(name, schema, options);
    }

    static registerModels(models) {
        models.forEach((model) => {
            const { name, schema, options } = model;
            this.registerModel(name, schema, options);
        });
    }

    /**
     * 
     * @param {*} modelName Name of the table model
     * @param {*} query 
     * @returns 
     */
    static async findAll(modelName, query = {}) {
        return await this.getModel(modelName).findAll(query);
    }

    /**
     *
     * @param {*} modelName Name of the table model
     * @param {*} query
     * @returns
     */
    static async findOne(modelName, query = {}) {
        return await this.getModel(modelName).findOne(query);
    }

    /**
     *
     * @param {*} modelName Name of the table model
     * @param {*} value
     * @param {*} options
     * @returns
     */
    static async upsert(modelName, value, options = {}) {
        return await this.getModel(modelName).upsert(value, options);
    }

    /**
     *
     * @param {*} query String :  Pass your SQL Query
     * @param {*} options
     * @returns
     */
    static async query(query, options) {
        return await this.getClient().query(query, options);
    }

    /**
     * 
     * @param {*} modelName Name of the model
     * @param {*} updateData Object of data to be updated
     * @param {*} query query to find specific record
     * @returns 
     */
    static async update(modelName, updateData, query) {
        return await this
            .getModel(modelName)
            .update(updateData, query)
    }

    /**
     * 
     * @param {*} modelName Name of the table model
     * @param {*} model Object of model data to create or update
     * @param {*} options Options to set for operation
     * @returns Result from DB
     */
    static async create(modelName, model, options = {}) {
        return await this.getModel(modelName).create(model, options);
    }

    static async count(modelName, query = {}) {
        return await this.getModel(modelName).count(query);
    }

    /**
     * 
     * @param {*} modelName Name of the table model
     * @param {*} models  Array of data models to create or update
     * @param {*} options Options to set for operation
     * @returns Result From DB
     */
    static async bulkCreate(
        modelName,
        models,
        options = {}
    ) {
        return await this.getModel(modelName).bulkCreate(models, options);
    }

    static createOptions({
        raw = false,
        isNewRecord = true,
        fields = null,
        onDuplicate = null,
        transaction = null,
        benchmark = false
    }) {
        const options = {
            raw, /* Boolean : If set to true, values will ignore field and virtual setters. */
            isNewRecord,
            benchmark /* Boolean : Print query execution time in milliseconds when logging SQL */
        }

        fields ? options.fields = fields : ""; /* Array : If set, only columns matching those in fields will be saved */
        onDuplicate ? options.onDuplicate = onDuplicate : ""; /* String */
        transaction ? options.transaction = transaction : ""; /* Transaction : Transaction to run query under */

        return options;
    }

    static bulkCreateOptions({
        fields = null,
        validate = false,
        hooks = true,
        individualHooks = false,
        ignoreDuplicates = false,
        updateOnDuplicate = null,
        transaction = null,
        benchmark = false
    }) {
        const options = {
            validate, /* Boolean : Should each row be subject to validation before it is inserted. The whole insert will fail if one row fails validation */
            hooks, /* Boolean : Run before / after bulk create hooks */
            individualHooks, /* Boolean : Run before / after create hooks for each individual Instance? BulkCreate hooks will still be run if options.hooks is true. */
            ignoreDuplicates, /* Boolean : Ignore duplicate values for primary keys? (not supported by postgres) */
            benchmark /* Boolean : Print query execution time in milliseconds when logging SQL */
        }

        fields ? options.fields = fields : ""; /* Array : Fields to insert (defaults to all fields) */
        updateOnDuplicate ? options.updateOnDuplicate = fields : ""; /* Array : Fields to update if row key already exists (on duplicate key update)? (only supported by mysql & mariadb). By default, all fields are updated. */
        transaction ? options.transaction = transaction : ""; /* Transaction : Transaction to run query under */

        return options;
    }

}

module.exports = MysqlConnector;