import express from 'express';
import { getUserAllData, getUserDataById, updateUserData, deleteAppointment, updateAppointment, deleteUserData, getAppinment, createUserData } from '../controllers/index.js';

const router = express.Router();


router.get('/', (req, res) => {
    res.send('Hello, World!');
});
router.get('/allDoctorList', (req, res) => {
    getUserAllData(req, res);
});
router.get('/doctor/:id', (req, res) => {
    getUserDataById(req, res);
});
router.patch('/user/:id', (req, res) => {
    updateUserData(req, res);
});
router.delete('/user/:id', (req, res) => {
    deleteUserData(req, res);
});
router.post('/CreateAppoinmentUser', (req, res) => {
    createUserData(req, res);
});

router.get('/getPatientAppoinment', (req, res) => {
    getAppinment(req, res)
})
router.put("/updateAppointment/:id", (req, res) => {
    updateAppointment(req, res);
});

router.delete("/deleteAppointment/:id", (req, res) => {
    deleteAppointment(req, res);
});

export default router;