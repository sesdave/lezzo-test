'use strict';
module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        categoryId: {
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
        image: DataTypes.STRING
    });

    Category.associate = (models) =>{
        Category.belongsTo(models.Store, {
            foreignKey:{
                name: 'storeId',
                type: DataTypes.STRING
            }
        })

        Category.hasMany(models.Product, {
            foreignKey: {
                name: "categoryId",
                type: DataTypes.STRING
            }
        });
    }

    return Category



}
