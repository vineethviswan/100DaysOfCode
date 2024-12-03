
/*------------------------------------------------------------------------
    Day 14 - JSON Web Tokens (JWT)
             Implement basic JWT authentication in an Express app
-------------------------------------------------------------------------*/

const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("./model/user.model");
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200);
    res.send('NodeJS with JWT!');
});

//Handling POST request
app.post('/login', async (req, res, next) => {

    let { email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch {
        const error = new Error('Error finding User!');
        return next(error);
    }

    if (!existingUser || existingUser.password != password) {
        const error = new Error('User does not exists or Incorrect Password!');
        return next(error);
    }

    let token;
    try {
        //Creating JWT token
        token = jwt.sign({
            userId: existingUser.id,
            email: existingUser.email,
        },
            "secretkeyappearshere",
            { expiresIn: "1h" }
        );
    } catch (err) {
        console.log(err);
        const error = new Error('Error Creating Token!');
        return next(error);
    }

    res
        .status(200)
        .json({
            success: true,
            data: {
                userId: existingUser.id,
                email: existingUser.email,
                token: token,
            },
        });
}
);

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({ message: users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/signup', async (req, res) => {

    const { name, email, password } = req.body;
    const newUser = User({ name, email, password });

    try {
        await newUser.save();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

    let token;
    try {

        token = jwt.sign(
            {
                userId: newUser.id,
                email: newUser.email
            },
            "secretkeyappearshere",
            { expiresIn: "1h" }
        );

    } catch (err) {
        const error = new Error('JWT Error!');
        return next(error);
    }

    res
        .status(201)
        .json({
            success: true,
            data: {
                userId: newUser.id,
                email: newUser.email,
                token: token
            },
        });
}
);

app.get('/accessResource', (req, res) => {
        
    const token = req.headers.authorization.split(' ')[1];

        //Authorization: 'Bearer TOKEN'
        if (!token) {
            res.status(200)
                .json(
                    {
                        success: false,
                        message: "Error!Token was not provided."
                    }
                );
        }
        //Decoding the token
        const decodedToken =
            jwt.verify(token, "secretkeyappearshere");

        res.status(200).json(
            {
                success: true,
                data: {
                    userId: decodedToken.userId,
                    email: decodedToken.email
                }
            }
        );
    })

mongoose.connect("ConnectionString")
    .then(() => {
        console.log('Connected to the Database!');
        app.listen(3000, (req, res) => {
            console.log('Server Running on port 3000!');
        });
    })
    .catch(() => {
        console.log('Connection Failed!');
    });