
/*------------------------------------------------------------------------
    Day 14 - JSON Web Tokens (JWT)
             Implement basic JWT authentication in an Express app
-------------------------------------------------------------------------*/

const express = require("express");
const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const User = require("./userModel");

const app = express();

app.use(express.json());

//Handling POST request
app.post('/login', 
    async (req, res, next) => {
        let {email, password} = req.body;
        let existingUser;
        try {
            existingUser = await User.findOne({email: email});
        } catch {
            const error = new Error ('Something\'s wrong!');
            return next(error);
        }

        if(!existingUser || existingUser.password != password) {
            const error = new Error ('Incorrect Password!');
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
            { expiresIn: "1h"}
            );
        } catch (err) {
            console.log(err);
            const error = new Error('JWT Error!');
            return next(error);
        }

        res
            .status(200)
            .json({
                success: true,
                data:{
                    userId: existingUser.id,
                    email: existingUser.email,
                    token: token,
                },
            });
    }
);

app.post('/signup', 
    async (req, res, next) => {
        const { name, email, password } = req.body;
        const newUser = User({name, email, password});

        try{
            await newUser.save();
        } catch {
            const error = new Error('Something went Wrong!');
            return next(error);
        }

        let token;
        try{
            token = jwt.sign(
                {
                    userId: newUser.id,
                    email: newUser.email
                },
                "secretkeyappearshere",
                { expiresIn: "1h"}
            );
        } catch(err){
            const error = new Error('JWT Error!');
            return next(error);
        }
        
        res
            .status(201)
            .json({
                success: true,
                data:{
                    userId: newUser.id,
                    email: newUser.email,
                    token: token
                },
            });
    }
);

//Connecting to the database
mongoose
    .connect("mongodb://localhost:27017/testDB")
    .then(() => {
        app.listen("3000", () => {
            console.log('Server Running on port 3000!');
        });
    })
    .catch( (error) => {
        console.log('Mongoose Error!');
    });