import fetch from 'node-fetch';

async function testCreateTaskWithDates() {
    try {
        // Étape 1: Connexion en tant qu'admin pour obtenir un token
        const loginResponse = await fetch('http://localhost:3002/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'admin@example.com',
                password: 'password123'
            })
        });

        const loginData = await loginResponse.json();
        const token = loginData.token;

        // Étape 2: Ajouter une tâche avec des dates
        const addTaskResponse = await fetch('http://localhost:3002/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                title: 'Nouvelle tâche avec dates',
                description: 'Description de la tâche',
                employeeId: 1,
                startDate: '2024-07-15T08:00:00Z',
                endDate: '2024-07-20T17:00:00Z'
            })
        });

        const addTaskData = await addTaskResponse.json();
        console.log('Add Task Response:', addTaskData);
    } catch (error) {
        console.error('Erreur:', error);
    }
}

testCreateTaskWithDates();
