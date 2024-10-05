const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define("users", {
        userid : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        username : {
            type : DataTypes.STRING,
            allowNull: false,
            unique : true
        },
        email : {
            type : DataTypes.STRING,
            defaultValue : "default@gmail.com"
        },
        passwordhash : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        gender : {
            type : DataTypes.STRING,
            allowNull : true,
            validate: {
                isIn: [['male', 'female', 'other']]
            }
        },
        phoneNo : DataTypes.STRING,
        pic : {
            type : DataTypes.STRING,
            defaultValue : null
        },
        profiletext : DataTypes.STRING,

    },
    {
        tableName : "users",
        timestamps : false
    })
    return users;
}