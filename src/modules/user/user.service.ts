import { Injectable } from "@nestjs/common";
import { UserDto } from "./dto/user.dto";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from "bcrypt";
import { Model } from "mongoose";
import { User, UserDocument } from "src/schemas/user.schema";

const saltOrRounds = 10;

@Injectable()
export class UserService{
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
    
    async getlistUsersDB(): Promise<User[]>{
        const listUsers = await this.userModel.find().exec();
        return listUsers; 
    }

    async createUsersDB(UserDto:UserDto){
        const hash = await bcrypt.hash(UserDto.password, saltOrRounds);
        
        const check = await this.userModel.findOne({email:UserDto.email})
        if (check != null){
            return "email already is exists in the system";
        }else{
            const user = new this.userModel({
                name:UserDto.name,
                email:UserDto.email,
                password:hash,
                isActive:UserDto.isActive,
                role:UserDto.role
            });
            return user.save();
        }

    }

    async getUserDB(Id:string):Promise<User>{
        const user = this.userModel.findById(Id).exec();
        return user;
    }

    async getUpdateDB(Id: string, UserDto: UserDto): Promise<User> {
        const user = await this.userModel.findOneAndUpdate(
            { _id: Id }, 
            {
                name: UserDto.name,
                email: UserDto.email,
                password: UserDto.password,
                isActive: UserDto.isActive
            },
            { new: true, runValidators: true }
        );
    
        if (!user) {
            throw new Error(`User with ID ${Id} not found`);
        }
        return user;
    }
}