/**
 * Created by Admin on 4/19/2017.
 */
testController = {};

testController.get = (req, res) => {
    res.render('index',  {
        title: 'Movie Watch List'
    });
};

module.exports = testController;