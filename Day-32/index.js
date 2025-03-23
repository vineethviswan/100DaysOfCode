

const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

exports.sendEmail = async (req, res) => {
    try {
        const { email, subject, message, userEmail } = res.locals.userData;
        console.log(email, subject, message, userEmail);

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

            var mailOptions = {
                from: userEmail,
                to: email,
                subject: subject,
                text: message
            };
            
            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    console.log(error);
                    res.json({ message: 'Email not sent', error });
                } else {
                    console.log('Email sent: ' + info.response);
                    res.status(201).json({ message: 'Email sent successfully', success: true });
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
}
