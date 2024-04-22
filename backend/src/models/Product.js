'use strict';

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        productId: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
            require: true
        },
        image: DataTypes.STRING,
        price:{
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0.00
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0
        },
        url: {
          type: DataTypes.STRING, // BLOB data type for storing binary data
          allowNull: true
        }
    });

    Product.associate = models =>{
        Product.belongsTo(models.Category, {
            foreignKey: {
                name: "categoryId",
                type: DataTypes.STRING
            }
        })
    }


    return Product
}

