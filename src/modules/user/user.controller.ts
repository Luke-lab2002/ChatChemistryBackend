import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";

@Controller("/user")
export class UserController{

    constructor(private readonly UserService: UserService){

    }

    @Get()
    HandleGetListUsers(){
        return this.UserService.getlistUsersDB();
    }

    @Post("/create-user")
    HandleCreateUser(@Body() UserDto:UserDto){
        return this.UserService.createUsersDB(UserDto);
    }

    @Get("/:Id")
    HandleGetUser(@Param("Id") Id:string){
        return this.UserService.getUserDB(Id);
    }

    @Put("/:Id")
    HandleUpdateUser(@Param("Id") Id:string ,@Body() UserDto:UserDto){
        return this.UserService.getUpdateDB(Id, UserDto);
    }
}