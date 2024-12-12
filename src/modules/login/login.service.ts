import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "src/schemas/user.schema";
import { LoginFormDTO } from "./dto/login_from.dto";
import * as bcrypt from "bcrypt";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { rootCertificates } from "tls";


@Injectable()
export class LoginService{
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService
    ){}
    
    async loginDB(loginFormDTO:LoginFormDTO){
        try {
            const user = await this.userModel.findOne({
                email:loginFormDTO.email
            })
    
            const isPassword = await bcrypt.compare(loginFormDTO.password, user.password)
            console.log(isPassword)
            
            if(isPassword){
                const payload = { sub: user._id, name: user.name, role:user.role };
                return {
                    access_token: await this.jwtService.signAsync(payload),
                    "id":user._id,
                    "name":user.name,
                    "role":user.role,
                    "state":"success"
                };
            }else{
                return {
                    "Error":"login failed",
                    "state":"failed"
                }
            }
        } catch (error) {
            return {
                "Error":"login failed",
                "state":"failed"
            }
        }
       
    }
}