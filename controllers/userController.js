/**
 * Created by Admin on 4/19/2017.
 */
const userModel= require('./../models/index');
userController = {};

userController.create = (req, res) => {

    const {username, password} = req.body;
    //validation

    const user = new db.User({
        username,
        password
    });
    user.save()
        .then((newUser) => {
            res.status(200).json({
                success: true,
                data: newUser
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: err
            });
        });
}

module.exports = userController;