const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');
const {mongoose} = require('./db/mongoose'); 

const bodyParser = require('body-parser');

//mongoose models
const { List, Task, User} = require('./db/models');

/** MIDDLEWARE */

//Load middleware
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, HEAD, OPTIONS, PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    res.header("Access-Control-Expose-Headers", "x-access-token, x-refresh-token");
    next();
  });


  // Check whether req has a valid JWT token
let authenticate = (req, res, next) => {
    let token = req.header('x-access-token');

    // verify jwt
    jwt.verify(token, User.getJWTSecret(), (err, decoded) => {
        if (err) {
            // an error has occurred...invalid jwt. 
            // do not authenticate
            res.status(401).send(err);
        } else {
            // jwt is valid
            req.user_id = decoded._id;
            next();
        }
    });
}

//Verify refresh token middleware (to verify session)
let verifySession = (req, res, next) => {
    //Grab the refresh token and _id from the header
    let refreshToken = req.header('x-refresh-token');
    let _id = req.header('_id');

    User.findByIdAndToken(_id, refreshToken).then((user) => {
        if (!user) {
            //User not found
            return Promise.reject({
                'error': 'Not Authorized: 1'
            });
        } 
        

        // User was found
        // refresh token is in db, we have to check if it is expired or not
        req.user_id = user._id;
        req.userObject = user;
        req.refreshToken = refreshToken;

        let isSessionValid = false;

        user.sessions.forEach((session) => {
            if (session.token == refreshToken) {
                //Check if session has expired
                if (User.hasRefreshTokenExpired(session.expiresAt) === false) {
                    //Token not expired
                    isSessionValid = true;
                }
            }
        });

        if (isSessionValid) {
            //Session is valid. Call next to continue with request
            next();
        } else {
            //Session is not valid
            return Promise.reject({
                'error': 'Not Authorized: 2'
            });
        }
    }).catch((e) => {
        res.status(401).send(e);
    });
}

/** MIDDLEWARE */

/* ROUTE HANDLERS */

/* LIST ROUTES */
app.get('/lists', authenticate, (req, res) => {
    //send the list array of all lists that belong to the authenticated user
    List.find({
        _userId: req.user_id
    }).then((lists) => {
        res.send(lists);
    })
}); 

app.post('/lists', authenticate, (req, res) => {
    //Add a new list
    let newList = new List({
        title: req.body.title,
        description: req.body.description,
        _userId: req.user_id
    });
    newList.save().then((listDoc) => {
        res.send(listDoc);
    });
});

app.patch('/lists/:id', authenticate, (req, res) => {
    //Update a list
    List.findOneAndUpdate({ _id: req.params.id, _userId: req.user_id}, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200);
    });
});

app.delete('/lists/:id', authenticate, (req, res) => {
    //Delete the specified list
    List.findOneAndRemove({
        _id: req.params.id,
        _userId: req.body.user_id
    }).then((removedListDoc) => {
        res.send(removedListDoc);

        //Delete associated tasks
        deleteTasksFromList(removedListDoc._id);
    } );
});

app.get('/lists/:listId/tasks', (req, res) => {
    //send the task array
    Task.find({
        _listId: req.params.listId
    }).then((tasks) => {
        res.send(tasks);
    })
});

app.get('/lists/:listId/tasks/:taskId', authenticate, (req, res) => {
    Task.findOne({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((task) => {
        res.send(task);
    });
});

app.post('/lists/:listId/tasks', authenticate, (req, res) => {

    List.findOne({
        _id: req.params.listId,
        _userId: req.user_id
    }).then((user) => {
        if (user) {
            //User object is valid
            return true;
        }
        //User profile is undefined
    }).then((canCreateTask) => {
        if (canCreateTask) {
            let newTask = new Task({
                title: req.body.title,
                _listId: req.params.listId
            });
            newTask.save().then((newTaskDoc) => {
                res.send(newTaskDoc);
            });
        } else {
            res.sendStatus(404);
        }
    });
});

app.patch('/lists/:listId/tasks/:taskId', authenticate, (req, res) => {
    Task.findOneAndUpdate({
        _id: req.params.taskId,
        _listId: req.params.listId  
    }, {        
        $set: req.body
    }).then(() => {
        res.send({message: 'Task saved successfully'});
    });
});

app.delete('/lists/:listId/tasks/:taskId', authenticate, (req, res) => {
    Task.findByIdAndRemove({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((removedTask) => {
        res.send(removedTask);
    });
});

/**
 * User routes
 */

 /**
  * POST /users
  * Signup
  */
app.post('/users', (req, res) => {
    //USer sign up
    let body = req.body;
    let newUser = new User(body);

    newUser.save().then(() => {
        return newUser.createSession();
    }).then((refreshToken) => {
        //Session created successfully
        //Generate access auth token for user

        return newUser.generateAccessToken().then((accessToken) => {
            //We now have access token and refresh token
            return {accessToken, refreshToken};
        });
    }).then((authTokens) => {
        //Construct and send response back to client, with the auth
        //tokens in the header and the user object in the body
        res
        .header('x-refresh-token', authTokens.refreshToken)
        .header('x-access-token', authTokens.accessToken)
        .send(newUser);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

/**
 * /post/users/login
 * User Login route
 */
app.post('/users/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    User.findByCredentials(email, password).then((user) => {
        console.log('User logged in ' + user._id);
        return user.createSession().then((refreshToken) => {
            //Session created successfully
            //Generate access auth token for user

            return user.generateAccessToken().then((accessToken) => {
                //We now have access token and refresh token
                return {accessToken, refreshToken};
            });
        }).then((authTokens) => {
            //Construct and send response back to client, with the auth
            //tokens in the header and the user object in the body
            res
            .header('x-refresh-token',authTokens.refreshToken)
            .header('x-access-token', authTokens.accessToken)
            .send(user);
        });
    }).catch((e) => {
        console.log('User auth failed ' + e);
        res.status(400).send(e);
    });
});

/** 
 * GET /users/me/access-token
 * Generate and return user's access token
*/
app.get('/users/me/access-token', verifySession, (req, res) => {
    //We know that the user/caller is authenticated
    //We have the user _id and user object available to us
    req.userObject.generateAccessToken().then((accessToken) => {
        res.header('x-access-token', accessToken).send({ accessToken});
    }).catch((e) => {
        res.status(400).send(e);
    })
});

/** Helper methods */
let deleteTasksFromList = (_listId)  => {
    Task.deleteMany({
        _listId
    });
}


app.listen(3000, () => {
console.log("Server is listening on port 3000");
});