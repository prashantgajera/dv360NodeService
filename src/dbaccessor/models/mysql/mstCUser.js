const { DataTypes } = require("sequelize");

const name = "mstCUser";

const schema = {
    cUserId: {
        type: DataTypes.INTEGER,
        field: "c_user_id",
        autoIncrement: true,
        primaryKey: true
    },
    cUserName: {
        type: DataTypes.STRING,
        field: "c_user_name",
        allowNull: false
    },
    cPassword: {
        type: DataTypes.STRING,
        field: "c_password",
        allowNull: false
    },
    clientId: {
        type: DataTypes.INTEGER,
        field: "client_id",
        allowNull: false
    },
    isAdmin: {
        type: DataTypes.TINYINT,
        field: "is_admin",
        allowNull: false,
        defaultValue: 0
    },
    isActive: {
        type: DataTypes.TINYINT,
        field: "is_active",
        allowNull: false,
        defaultValue: 0
    },
    created: {
        type: DataTypes.DATE,
        field: "created",
        allowNull: false,
        unique: true
    },
    modified: {
        type: DataTypes.DATE,
        field: "modified",
        allowNull: true,
        unique: true
    },
    remarks: {
        type: DataTypes.STRING,
        field: "remarks",
        allowNull: true
    }
};

const options = {
    tableName: "mst_c_user",
    timestamps: false
};

module.exports = { name, schema, options };
