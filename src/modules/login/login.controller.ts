import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { LoginFormDTO } from "./dto/login_from.dto";
import { LoginService } from "./login.service";

@Controller("login")
export class LoginController{
    constructor(private readonly loginService:LoginService){}

    @Post()
    login(@Body() loginFormDTO:LoginFormDTO){
        const acces_token = this.loginService.loginDB(loginFormDTO);
        return acces_token;
    }
}