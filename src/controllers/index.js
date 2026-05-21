import { ObjectId } from "mongodb";
import { client } from '../services/db.js';

export const getUserAllData = async (req, res) => {
    try {

        const doctorCollection = client
            .db("doctor")
            .collection("doctor_list");
        const userData = await doctorCollection.find({}).toArray();

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

export const getAppinment = async (req, res) => {
    try {
        const email = req.query.email;

        console.log("Testing email:", email);

        const patientCollection = client
            .db("patient")
            .collection("patient_list");

        const userAppointments = await patientCollection
            .find({ userEmail: email })
            .toArray();

        console.log("data:", userAppointments);

        return res.status(200).json({
            success: true,
            message: "Appointments fetched successfully",
            data: userAppointments,
        });

    } catch (error) {
        console.error("Error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};



export const updateAppointment = async (req, res) => {
    try {
        console.log("Update Appointment Request Body:", req.body);
        const { id } = req.params;
        console.log("Testing ID:", id);
        const {
            patientName,
            appointmentDate,
            appointmentTime,
            gender,

        } = req.body;

        const patientCollection = client
            .db("patient")
            .collection("patient_list");

        const result = await patientCollection.updateOne(
            { _id: new ObjectId(id) },
            {
                $set: {
                    patientName,
                    appointmentDate,
                    appointmentTime,
                    gender,


                },
            }
        );

        return res.status(200).json({
            success: true,
            message: "Appointment updated successfully",
            data: result,
        });
    } catch (error) {
        console.error("Update Error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};



export const deleteAppointment = async (req, res) => {
    try {
        console.log("delete fun call")
        const { id } = req.params;
        console.log("delete", id)
        const patientCollection = client
            .db("patient")
            .collection("patient_list");

        const result = await patientCollection.deleteOne({
            _id: new ObjectId(id),
        });

        return res.status(200).json({
            success: true,
            message: "Appointment deleted successfully",
            data: result,
        });
    } catch (error) {
        console.error("Delete Error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};