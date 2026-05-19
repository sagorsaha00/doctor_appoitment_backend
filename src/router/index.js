import express from 'express';
import { getUserAllData, getUserDataById, updateUserData, deleteUserData, createUserData } from '../controllers/index.js';

const router = express.Router();


router.get('/', (req, res) => {
    res.send('Hello, World!');
});
router.get('/allUser', (req, res) => {
    getUserAllData(req, res);
});
router.get('/user/:id', (req, res) => {
    getUserDataById(req, res);
});
router.patch('/user/:id', (req, res) => {
    updateUserData(req, res);
});
router.delete('/user/:id', (req, res) => {
    deleteUserData(req, res);
});
router.post('/user', (req, res) => {
    createUserData(req, res);
});


export default router;