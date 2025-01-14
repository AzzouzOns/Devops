import express from 'express';
import authMiddleware from '../middleware/auth.js';
import TaskController from '../controllers/task.controller.js';
import authorize from '../middleware/authorize.js';

const router = express.Router();

// Route pour créer une tâche
router.post('/', authMiddleware, authorize(['admin']), TaskController.createTask);
router.put('/:taskId', authMiddleware, authorize(['admin']), TaskController.updateTask);
router.delete('/:taskId', authMiddleware, authorize(['admin']), TaskController.deleteTask);
router.get('/all', authMiddleware, authorize(['admin']), TaskController.getAllTasks);

router.get('/employee/:employeeId', authMiddleware, authorize(['admin']), TaskController.getTasksByEmployee);

router.get('/my-tasks', authMiddleware, TaskController.getTasksForEmployee);
router.put('/:taskId/status', authMiddleware, authorize(['admin', 'employee']), TaskController.updateTaskStatus);
export default router;
