'use strict';

module.exports = (sequelize, DataTypes)=>{
    const Store = sequelize.define('Store', {
        storeId:{
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type:DataTypes.STRING,
            require: true,
            allowNull: false
        },
        location:{
            type: DataTypes.STRING
        },
        logo: DataTypes.STRING
    });

    Store.associate = models =>{
        Store.hasMany(models.Category, {
            foreignKey:{
                name: "storeId",
                type: DataTypes.STRING
            }
        })
    }

    return Store
}

