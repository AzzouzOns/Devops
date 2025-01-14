import employeeModel from '../model/employee.js';
import taskModel from '../model/task.js';

const Employee = employeeModel(sequelize);
const Task = taskModel(sequelize);

const EmployeeController = {
    async getTasks(req, res) {
        try {
            const employeeId = req.user.id; // Supposons que l'ID de l'utilisateur est stocké dans req.user.id
            const tasks = await Task.findAll({ where: { employeeId } });
            res.status(200).json(tasks);
        } catch (error) {
            console.error('Erreur lors de la récupération des tâches :', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des tâches' });
        }
    },

    async markTaskComplete(req, res) {
        const { taskId } = req.params;

        try {
            const task = await Task.findByPk(taskId);

            if (!task) {
                return res.status(404).json({ error: 'Tâche non trouvée' });
            }

            task.completed = 'done';
            await task.save();

            res.status(200).json(task);
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la tâche :', error);
            res.status(500).json({ error: 'Erreur lors de la mise à jour de la tâche' });
        }
    },
};

export default EmployeeController;