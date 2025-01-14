import { userModel } from './user.js';
import { taskModel } from './task.js';

export const employeeModel = (sequelize) => {
    const User = userModel(sequelize);
    const Task = taskModel(sequelize);

    const Employee = User.scope('employee');

    // one_to_many
    Employee.hasMany(Task, { foreignKey: 'employeeId' });
    Task.belongsTo(Employee, { foreignKey: 'employeeId' });

    return Employee;
};
