import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!) // ! means i am taking care that the MONGO_URI will be available always and is taken care by me
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log('MongoDb connected Successfully');
        })

        connection.on('error', (err) => {
            console.log('Mongodb connection error. Please make sure Mongodb is running', + err);
            process.exit();
        })
    } catch (error) {
        console.log('error in db config', error);
    }
}