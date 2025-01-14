import express from 'express';
import { connection } from './postgrsql.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import taskRoutes from './routes/task.routes.js'; // Assurez-vous d'importer taskRoutes
import authMiddleware from './middleware/auth.js'; // Importer authMiddleware
import authorize from './middleware/authorize.js'; // Importer authorize
import cors from 'cors'; 

const app = express();
const PORT = 3002;


app.use(express.json());


app.use(cors({
    origin: 'http://localhost:4200'
  }));



connection();

app.use('/api/auth', authRoutes);
app.use('/api/users', authMiddleware, authorize(['admin']), userRoutes);
app.use('/api/tasks', authMiddleware, taskRoutes); // Assurez-vous d'utiliser taskRoutes

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server is running at ${PORT}`);
    });
}

export default app;