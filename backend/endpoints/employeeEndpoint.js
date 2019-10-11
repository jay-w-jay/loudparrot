import Employee from '../models/employee';

module.exports = function(router) {

router.route('/employees').get((req, res) => {
    Employee.find((err, employees) => {
        if (err) {
            console.log(err)
            res.status(400, 'Request error ' + err)
        } else
            res.json(employees);
    });
});

router.route('/employees/add').post((req, res) => {
    let emp = new Employee(req.body);
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

router.route('/employees/update/:id').post((req, res) => {
    Employee.findById(req.params.id, (err, emp) => {
        if (!emp)
            return next(new Error('Could not find Employee'));
        else {
            emp = Object.assign(emp, req.body);

            emp.save().then(emp => {
                res.json('Employee updated successfully');
            }).catch(err => {
                res.status(400).send('Could not update Employee');
            });

        }
    });
});

router.route('/employees/:id').get((req, res) => {
    Employee.findById(req.params.id, (err, emp) => {
        if (err) {
            console.log(err);
            res.status(400).send('Could not find employee ' + req.params.id + "\n\n" + err) ;
        }
        else
            res.json(emp);
    });
});

}