// domain.com/verifytoken/assasasdfdfsdfas
// domain.com/verifytoken?token=dgfsafasdf
'use strict'
import nodemailer from 'nodemailer'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        // create a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)
        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000,
            })
        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000,
            })
        }
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "cb0193460427e4",
                pass: "cca16f647b2044"
            }
        });
        const mailOptions = {
            from: 'hitesh@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "VERIFY your email": 'Reset your password',
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> ${emailType === "VERIFY" ? "Verify your email" : "reset your password"}
            or copy and paste the link in your browser: <br /> ${process.env.DOMAIN}/verifyemail?token=${hashedToken} </p>
            <p>Note: This link will expire in 1 hour</p>
            </p>`
        }
        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;

    } catch (error) {
        console.log('error in sending email');

    }
}