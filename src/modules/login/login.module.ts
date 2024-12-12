import { Module } from "@nestjs/common";
import { LoginController } from "./login.controller";
import { UserModule } from "../user/user.module";
import { LoginService } from "./login.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/schemas/user.schema";
import { JwtModule } from "@nestjs/jwt";
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
    imports:[
        UserModule,
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule.register({
            global: true,
            secret: process.env.SCRETKEY,
            signOptions: { expiresIn: '1d' },
        }),
    ],
    controllers:[LoginController],
    providers:[LoginService]
})
export class LoginModule{}