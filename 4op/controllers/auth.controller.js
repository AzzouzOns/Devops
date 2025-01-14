// auth.controller.js

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../postgrsql.js';
import dotenv from 'dotenv';
import { body, validationResult } from 'express-validator';

// Load environment variables from .env file
dotenv.config();

const AuthController = {
    // Register new user
    async register(req, res) {
        const { email, password, name, role } = req.body;

        // Validate role and input fields
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Check if email is already used
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'L\'email est déjà utilisé' });
        }

        // Validate role
        if (role !== 'admin' && role !== 'employee') {
            return res.status(400).json({ error: 'Le rôle doit être "admin" ou "employee"' });
        }

        try {
            // Hash password
            const hashedPassword = await bcrypt.hash(password, 12); // Use a higher salt value (12)

            // Create new user
            const newUser = await User.create({ email, password: hashedPassword, name, role });
            res.status(201).json(newUser);
        } catch (error) {
            console.error('Erreur lors de la création de l\'utilisateur :', error);
            res.status(500).json({ error: 'Erreur serveur lors de la création de l\'utilisateur', details: error.message });
        }
    },

    // Login user
    async login(req, res) {
        const { email, password } = req.body;

        try {
            // Find user by email
            const user = await User.findOne({ where: { email } });
            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({ error: 'Nom d\'utilisateur ou mot de passe incorrect' });
            }

            // Generate JWT token
            const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '72h' });
            
            res.status(200).json({ token, role: user.role });
        } catch (error) {
            console.error('Erreur lors de la connexion :', error);
            res.status(500).json({ error: 'Erreur serveur lors de la connexion', details: error.message });
        }
    }
};

// Export as default
export default AuthController;

// Input validation rules
const validations = [
    body('email').isEmail().withMessage('Email invalide'),
    body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
    body('name').notEmpty().withMessage('Le nom est requis'),
    body('role').isIn(['admin', 'employee']).withMessage('Le rôle doit être "admin" ou "employee"')
];

export { validations };
