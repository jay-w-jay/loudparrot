import userSchema from '../models/user';

module.exports = function(router) {

    router.route('/users/add').post((req, res) => {
        let emp = new userSchema(req.body);
        emp.save()
            .then(emp => {
                res.status(200).json({'emp': 'Added successfully'});
            })
            .catch (err => {
                res.status(400).send('Failed to create new record: ' + err);
                console.log(err);
                console.log(emp);
            });
    });

}