import { Schema, model, models } from 'mongoose'; //helps interact with the mongodb database

// tables in database
const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'], // if it's not unique then the email was already in the database
    required: [true, 'Email is required!'],
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
  },
  image: {
    type: String,
  }
});

/**
 * The models object is provided by the Mongoose Library and stores all the registered models.
 * If a model named "User" already exists in the models object, it assigns that existing model to the "User" variable.
 * This prevents redefining the model and ensures that the existing model is reused.
 * If a model named "User" does not exist in the "models" object, the "model" function from Mongoose is called to create a new model.
 * The newly created model is then assigned to the "User Variable"
 */

const User = models.User || model("User", UserSchema);

export default User;