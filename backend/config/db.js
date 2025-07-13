import mongoose from "mongoose";


function connectDb(){
     mongoose.connect(`${process.env.MONGODB_URI}/taskPlanet`)
     .then(() => console.log("Mongodb connected successfully!!"))
     .catch((err) => console.log("Failed to connect db: " , err.message))
}

export default connectDb;