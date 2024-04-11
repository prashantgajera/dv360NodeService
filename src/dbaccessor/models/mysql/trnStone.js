const { DataTypes } = require("sequelize");

const name = "trnStone";

const schema = {
    stoneId: {
        type: DataTypes.INTEGER,
        field: "stone_id",
        autoIncrement: true,
        primaryKey: true
    },
    stoneCode: {
        type: DataTypes.STRING,
        field: "stone_code",
        allowNull: false
    },
    certificate: {
        type: DataTypes.STRING,
        field: "certificate_no",
        allowNull: false
    },
    clientId: {
        type: DataTypes.INTEGER,
        field: "client_id",
        allowNull: false
    },
    size: {
        type: DataTypes.STRING,
        field: "size",
        allowNull: false
    },
    shape: {
        type: DataTypes.STRING,
        field: "shape",
        allowNull: false
    },
    color: {
        type: DataTypes.STRING,
        field: "color",
        allowNull: false
    },
    clarity: {
        type: DataTypes.STRING,
        field: "clarity",
        allowNull: false
    },
    videoLink: {
        type: DataTypes.STRING,
        field: "video_link",
        allowNull: true
    },
    photoLink1: {
        type: DataTypes.STRING,
        field: "photo_link1",
        allowNull: true
    },
    photoLink2: {
        type: DataTypes.STRING,
        field: "photo_link2",
        allowNull: true
    },
    photoLink3: {
        type: DataTypes.STRING,
        field: "photo_link3",
        allowNull: true
    },
    photoLink4: {
        type: DataTypes.STRING,
        field: "photo_link4",
        allowNull: true
    },
    photoLink5: {
        type: DataTypes.STRING,
        field: "photo_link5",
        allowNull: true
    },
    photoLink5: {
        type: DataTypes.STRING,
        field: "photo_link5",
        allowNull: true
    },
    invoiceNo: {
        type: DataTypes.STRING,
        field: "invoice_no",
        allowNull: true
    },
    win_user_id: {
        type: DataTypes.INTEGER,
        field: "win_user_id",
        allowNull: true
    },
    videoCreateUserId: {
        type: DataTypes.INTEGER,
        field: "video_created_user_id",
        allowNull: true
    },
    creationDate: {
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
    tableName: "trn_stone",
    timestamps: false
};

module.exports = { name, schema, options };
