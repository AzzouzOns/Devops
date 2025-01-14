import { DataTypes } from 'sequelize';

const userModel = (sequelize) => {
    return sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('admin', 'employee'),
            allowNull: false,
        },
    }, {
        tableName: 'Users',
        timestamps: true,
    });
};

export default userModel;
