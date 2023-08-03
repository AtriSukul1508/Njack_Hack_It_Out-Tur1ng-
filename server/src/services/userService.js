const userModel = require("../models/user")

class userService {
    
    // register a user model
    // async createPatient(user) {
    //     return await userModel.create(patient)
    // }

    // // Edit a user
    // async update(id, userData) {
    //     return await patientModel.findByIdAndUpdate(id, patientData, { 
    //         new: true
    //     })
    // }

    // Delete a user
    async delete(filter){
        return await userModel.findByIdAndDelete(filter)
    }

    // find a user by their id
    async findOne(filter){
        return await userModel.findOne(filter)
    } 

    // Get all users 
    async getAll(filter) {
        return await userModel.find(filter)
    }
}
module.exports = new userService()