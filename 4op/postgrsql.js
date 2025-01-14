import { Sequelize } from 'sequelize';
import userModel from './model/user.js';
import taskModel from './model/task.js';

const sequelize = new Sequelize('Emp', 'postgres', 'sbamo', {
    host: 'localhost',
    dialect: 'postgres',
});

const User = userModel(sequelize); // Crée le modèle User
const Task = taskModel(sequelize); // Crée le modèle Task

// Définir les relations
User.hasMany(Task, { foreignKey: 'employeeId' });
Task.belongsTo(User, { foreignKey: 'employeeId' });
// Fonction de connexion
const connection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync(); // Synchronise les modèles
        console.log('Tables synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

export { sequelize, connection, User, Task };