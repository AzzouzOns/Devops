import { Task } from '../postgrsql.js'; 
import { User } from '../postgrsql.js';
const TaskController = {
    async createTask(req, res) {
        const { title, description, employeeId, startDate, endDate } = req.body;
    
        // Vérifie si l'employé existe
        const employee = await User.findByPk(employeeId);
        if (!employee) {
            return res.status(404).json({ error: 'Employé non trouvé' });
        }
    
        try {
            const newTask = await Task.create({ title, description, employeeId, startDate, endDate });
            res.status(201).json(newTask);
        } catch (error) {
            console.error('Erreur lors de la création de la tâche :', error.message);
            res.status(500).json({ error: 'Erreur lors de la création de la tâche', details: error.message });
        }
    },


    async updateTask(req, res) {
        const { taskId } = req.params;
        const { title, description, status } = req.body;
    
        try {
            const task = await Task.findByPk(taskId);
    
            if (!task) {
                return res.status(404).json({ error: 'Tâche non trouvée' });
            }
    
            // Mettre à jour les attributs de la tâche
            task.title = title !== undefined ? title : task.title;
            task.description = description !== undefined ? description : task.description;
            task.status = status !== undefined ? status : task.status;
    
            await task.save();
    
            res.status(200).json(task);
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la tâche :', error);
            res.status(500).json({ error: 'Erreur lors de la mise à jour de la tâche' });
        }
    },

    
    async deleteTask(req, res) {
        const { taskId } = req.params;
    
        try {
            const task = await Task.findByPk(taskId);
    
            if (!task) {
                return res.status(404).json({ error: 'Tâche non trouvée' });
            }
    
            await task.destroy();
            res.status(200).json({ message: 'Tâche supprimée avec succès' });
        } catch (error) {
            console.error('Erreur lors de la suppression de la tâche :', error);
            res.status(500).json({ error: 'Erreur lors de la suppression de la tâche' });
        }
    },

    async getAllTasks(req, res) {
        try {
            const tasks = await Task.findAll({
                include: {
                    model: User,
                    attributes: ['id', 'name'], // Inclure des informations sur l'employé
                },
            });
            res.status(200).json(tasks);
        } catch (error) {
            console.error('Erreur lors de la récupération des tâches :', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des tâches' });
        }
    },


    async getTasksByEmployee(req, res) {
        const { employeeId } = req.params; // Récupérer l'ID de l'employé depuis les paramètres
    
        try {
            const tasks = await Task.findAll({
                where: { employeeId },
            });
    
            if (tasks.length === 0) {
                return res.status(404).json({ message: 'Aucune tâche trouvée pour cet employé.' });
            }
    
            res.status(200).json(tasks); // Retourner les tâches trouvées
        } catch (error) {
            console.error('Erreur lors de la récupération des tâches :', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des tâches' });
        }
    },


    async getEmployeeTasks(req, res) {
        const { userId } = req.user;
        try {
            const tasks = await Task.findAll({ where: { employeeId: userId } });
            res.status(200).json(tasks);
        } catch (error) {
            console.error('Erreur lors de la récupération des tâches :', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des tâches' });
        }
    },



    async getTasksForEmployee(req, res) {
        const employeeId = req.user.id; 
    
        try {
            const tasks = await Task.findAll({
                where: { employeeId },
            });
    
            if (tasks.length === 0) {
                return res.status(404).json({ message: 'Aucune tâche trouvée pour cet employé.' });
            }
    
            res.status(200).json(tasks); // Retourner les tâches trouvées
        } catch (error) {
            console.error('Erreur lors de la récupération des tâches :', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des tâches' });
        }
    },


    async updateTaskStatus(req, res) {
  try {
    const { taskId } = req.params;
    const { status } = req.body;
    const task = await Task.findByPk(taskId);

    // Vérifiez que la tâche existe
    if (!task) {
      return res.status(404).json({ error: 'Tâche non trouvée' });
    }

    // Vérifiez si l'utilisateur est un admin ou l'employé assigné à la tâche
    if (req.user.role !== 'admin' && task.employeeId !== req.user.id) {
      return res.status(403).json({ error: 'Accès refusé' });
    }

    // Mettre à jour le statut de la tâche
    task.status = status;
    await task.save();

    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}
};


export default TaskController;