import { client } from '../services/db.js';

export const getUserAllData = async (req, res) => {
    try {
        console.log("get all user calling")
        const doctorCollection = client
            .db("doctor")
            .collection("doctor_list");
        const userData = await doctorCollection.find({}).toArray();
        console.log("userData", userData)
        return res.status(200).json({ data: userData });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getUserDataById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'user not found' });
        }
        const doctorCollection = client
            .db("doctor")
            .collection("doctor_list");
        const userData = await doctorCollection.findOne({ id: id });
        if (userData) {
            return res.status(200).json({ data: userData });
        } else {
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateUserData = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'user not found' });
        }
        const updateData = req.body;
        const doctorCollection = client
            .db("doctor")
            .collection("doctor_list");
        const result = await doctorCollection.updateOne({ id: id }, { $set: updateData });
        if (result.modifiedCount > 0) {
            return res.status(200).json({ message: 'User updated successfully' });
        } else {
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const deleteUserData = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'user not found' });
        }
        const doctorCollection = client
            .db("doctor")
            .collection("doctor_list");
        const result = await doctorCollection.deleteOne({ id: id });
        if (result.deletedCount > 0) {
            return res.status(200).json({ message: 'User deleted successfully' });
        } else {
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const createUserData = async (req, res) => {
    try {
        const userData = req.body;
        const patientCollection = client
            .db("patient")
            .collection("patient_list");
        const result = await patientCollection.insertOne(userData);
        if (result.acknowledged) {
            return res.status(201).json({ message: 'User created successfully' });
        } else {
            return res.status(500).json({ error: 'Failed to create user' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};