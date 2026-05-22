import express from 'express';
import { getUserAllData, getUserDataById, updateUserData, deleteAppointment, updateAppointment, deleteUserData, getAppinment, createUserData } from '../controllers/index.js';
import { createRemoteJWKSet, jwtVerify } from 'jose';

const router = express.Router();

const JWKS = createRemoteJWKSet(new URL('http://localhost:3000/api/auth/jwks'));

async function veryfy(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const splitToken = token.split(' ')[1];
    console.log(token);
    const payload = await jwtVerify(splitToken, JWKS);
    console.log("payload:", payload);
    next();
}


router.get('/', (req, res) => {
    res.send('Hello, World!');
});
router.get('/allDoctorList', veryfy, (req, res) => {
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
router.post('/CreateAppoinmentUser', veryfy, (req, res) => {
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