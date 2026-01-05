//Managing the data and Interacting with Database


import mongoose from "mongoose";
//mongoose is the default export from the "mongoose" package and gives you tools to define schemas, models, connect to MongoDB, and run queries.



//Declares a constant userSchema and assigns it a new Schema instance created by mongoose. A Schema defines the shape of documents within a MongoDB collection (which fields exist, their types, validation rules, default values, etc.). The { starts the object where you list field definitions.

const userSchema = new mongoose.Schema({

      name:{
               type:String,
               required : true
      },
      email:{
               type:String,
               required : true
      },
      address:{
               type:String,
               required : true
      }
})

export default mongoose.model('User', userSchema);

