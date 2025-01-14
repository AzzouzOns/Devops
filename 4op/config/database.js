import { Sequelize } from 'sequelize';

// Define Sequelize instance with correct configuration
const sequelize = new Sequelize('Emp', 'postgres', 'sbamo', {
    host: 'postgres', // Matches the service name in your Docker Compose file
    port: 5432,       // Default PostgreSQL port
    dialect: 'postgres', // Use PostgreSQL as the database
});

export default sequelize;
