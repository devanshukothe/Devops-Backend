//Handlinng the Request and processing data and responses

import User from "../model/userModel.js";


//Add data to the database
//req = request object (contains body, params, headers...)
//res = response object (used to send a response back to the client)
export const create = async(req, res) => {
   try {
        //Creates a new User document using data sent by the client in the request body.
        // Example: { name, email, address }
         const newUser = new User(req.body);

        //Extracts the email field from the newly created user object.
        // This is used to check if a user with the same email already exists.
         const {email} = newUser;

         const userExist = await User.findOne({email})
         if(userExist){
            return res.status(400).json({message: "User Already exists"});
         } 

         //Saves the new user document into the database using .save()

         // This returns the stored document with _id and timestamps.
         const saveData = await newUser.save();
         res.status(200).json(saveData);
   }  catch (error){
      res.status(500).json({errorMessage:error.message})
   }
};


export const getAllUsers = async (req, res) => {
   try {
      const userData = await User.find();
      if(!userData || userData.length === 0){
            res.status(404).json({message: " User data not found."})
      }
      res.status(200).json(userData);
   } catch (error) {
      res.status(500).json({ errorMessage: error.message });
   }
}


export const getUserById = async (req, res) => {
   try {
      //extracting id from parameter in url
      const id = req.params.id;

      const userExist = await User.findById(id);
      if(!userExist){
         res.status(404).json({message: "User not found."})
      }
      res.status(200).json(userExist);
   } catch (error) {
      res.status(500).json({errorMessage: error.message});
   }
}

export const updateUser = async(req, res) => {
   try {
      const id = req.params.id;

      const userExist = await User.findById(id);
      if(!userExist){
         res.status(404).json({message: "User not found."})
      }
      const userUpdated = await User.findByIdAndUpdate(id, req.body, {
         new:true
      });
      res.status(200).json(userUpdated);

   } catch (error) {
      res.status(500).json({errorMessage: error.message});
   }
}

export const deleteUser = async (req, res) => {
   try {
      const id = req.params.id;

      const userExist = await User.findById(id);
      if(!userExist){
         res.status(404).json({message: "User not found."})
      }
      await User.findByIdAndDelete(id);
      res.status(200).json({message: "Deleted user"})
   } catch (error) {
      res.status(500).json({errorMessage: error.message});
   }
}