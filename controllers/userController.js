const User = require ('../models/User');
const mongoose = require('mongoose');

module.exports = {
    deleteUser: async (req,res) =>{

            const userId = req.params.id.trim();

            if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: 'Invalid ObjectId' });
            }

            try {
            await User.findByIdAndDelete(userId);
            res.status(200).json('Successfully Deleted');
            } catch (error) {
            res.status(500).json(error);
            }
        // try {
        //     await User.findByIdAndDelete(req.params.id);
        //     res.status(200).json('Successfully Deleted')
        // } catch (error) {
        //     res.status(500).json(error)
        // }
    },

    // getUser: async (req,res) =>{
    //     try {
    //         const user = await User.findById(req.params.id)
    //         const {password,__v,createdAt,updatedAt,...userData}= user._doc;
    //         res.status(200).json(userData)
    //     } catch (error) {
    //         res.status(500).json(error)
    //     }
    // },
    getUser: async (req, res) => {
        try {
            const userId = req.params.id.trim();
    
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({ message: 'Invalid ObjectId format' });
            }
    
            const user = await User.findById(userId);
    
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            const { password, __v, createdAt, updatedAt, ...userData } = user._doc;
            res.status(200).json(userData);
        } catch (error) {
            res.status(500).json(error);
        }
    },
}