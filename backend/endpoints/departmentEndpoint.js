import Department from '../models/department';

module.exports = function(router) {

router.route('/departments').get((req, res) => {
    Department.find((err, items) => {
        if (err) {
            console.log(err)
            res.status(400, 'Request error ' + err)
        } else
            res.json(items);
    });
});

router.route('/departments/add').post((req, res) => {
    let item = new Department(req.body);
    item.save()
        .then(item => {
            res.status(200).json({'item': 'Added successfully'});
        })
        .catch (err => {
            res.status(400).send('Failed to create new record: ' + err);
            console.log(err);
            console.log(item);
        });
});

router.route('/departments/update/:id').post((req, res) => {
    Department.findById(req.params.id, (err, item) => {
        if (!item)
            return next(new Error('Could not find Department ' + err));
        else {
            item = Object.assign(item, req.body);

            item.save().then(item => {
                res.json('Employee updated successfully');
            }).catch(err => {
                res.status(400).send('Could not update department ' + err);
            });

        }
    });
});

router.route('/departments/:id').get((req, res) => {
    Department.findById(req.params.id, (err, item) => {
        if (err) {
            console.log(err);
            res.status(400).send('Could not find department ' + req.params.id + "\n\n" + err) ;
        }
        else
            res.json(item);
    });
});

}