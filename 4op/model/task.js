// Dans task.js

import { DataTypes } from 'sequelize';

const taskModel = (sequelize) => {
    return sequelize.define('Task', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
        },
        status: {
             type: DataTypes.ENUM('todo', 'in_progress', 'done'),
            defaultValue: 'todo'
        },
        employeeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false, 
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false, 
        },
    }, {
        tableName: 'Tasks',
        timestamps: true,
    });
};

export default taskModel;
