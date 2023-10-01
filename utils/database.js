import mongoose from 'mongoose'; // Library for mongodb and node js

let isConnected = false; // tracks the connection status

export const connectToDB = async () => {
  mongoose.set('strictQuery', true); // set the mongoose options, if we dont do this were gonna get warnings in the console

  if(isConnected) { //check if we are connected 
    console.log('MongoDB is already connected');
    return; // return out of this function to stop it from running 
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    isConnected = true; //if successfully connected

    console.log('MongoDB connected')
  } catch (error) {
    console.log(error);
  }
}