import User from '../models/user';

module.exports = function(router) {

router.route('/users/:id').post((req, res) => {
    User.find((err, items) => {
        if (err) {
            console.log(err)
            res.status(400, 'Request error ' + err)
        } else
            res.json(items);
    });
});

router.route('/login/:email/:password').post((req, res) => {
    email = req.params.email;
    password = req.params.password;

    User.findById(req.params.id, (err, item) => {
        if (err) {
            console.log(err);
            res.status(400).send('Could not find user ' + req.params.id + "\n\n" + err) ;
        }
        else
            res.json(item);
    });
});

router.route('/users/add').post((req, res) => {
    let item = new User(req.body);
    console.log("Adding new user "  +req.body)
    item.save()
        .then(item => {
            console.log("User Saved Successfully");
            res.status(200).json({'item': 'Added successfully'});
        })
        .catch (err => {
            res.status(400).send('Failed to create new record: ' + err);
            console.log(err);
            console.log(item);
        });
});

router.route('/users/update/:id').post((req, res) => {
    User.findById(req.params.id, (err, item) => {
        if (!item)
            return next(new Error('Could not find User ' + err));
        else {
            item = Object.assign(item, req.body);

            item.save().then(item => {
                res.json('Employee updated successfully');
            }).catch(err => {
                res.status(400).send('Could not update user ' + err);
            });

        }
    });
});

router.route('/users/:id').post((req, res) => {
    User.findById(req.params.id, (err, item) => {
        if (err) {
            console.log(err);
            res.status(400).send('Could not find user ' + req.params.id + "\n\n" + err) ;
        }
        else
            res.json(item);
    });
});

}