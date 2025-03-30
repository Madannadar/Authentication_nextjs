import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { email, password } = reqBody;
        console.log('reqBody',reqBody); // reqBody { email: 'abc@gmail.com', password: 'abc123' }

        const user = await User.findOne({ email })
        console.log('user',user); 
        // user {
        //     _id: new ObjectId('67e8d442d1cb4017a3126cc2'),
        //     username: 'abc',
        //     email: 'abc@gmail.com',
        //     password: '$2b$10$epZJmmbI2AJ05g0n2W19MemTcpPc3yvxeyBaj0mLxateUUI/T0cCG',
        //     isVerified: false,
        //     isAdmin: false,
        //     __v: 0
        //   }
        
        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 })
        }
        console.log('user exist'); //user exist
        
        const validPassword = await bcryptjs.compare(password, user.password)
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 })
        }
        console.log('valid password');
        
        // create token data 
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        // create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' })

        const response = NextResponse.json({
            message: "Login successfully",
            success: true,
        })
        response.cookies.set('token', token, { httpOnly: true })
        return response

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}