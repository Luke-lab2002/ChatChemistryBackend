import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { MessagesService } from "./messages.service";
import { messagesDTO } from "./dto/message.dto";

@Controller("messages")
export class MessagesController{

    constructor(private readonly MessagesService:MessagesService){}

    @Get()
    HandleGetAllMessages(){
        const listMess = this.MessagesService.getAllMessagesDB();
        return listMess;
    }

    @Post("/create-mess")
    HandleCreateMessage(@Body() messagesDTO:messagesDTO){
        const message = this.MessagesService.createMessageDB(messagesDTO);
        return message;    
    }

    @Get("/:Id")
    HandleGetListMessages(@Param("Id") Id:string){
        const listMess = this.MessagesService.getListMessagesDB(Id);
        return listMess;
    }

    @Post("/send")
    HandleSendMessage(@Body() messagesDTO:messagesDTO){
        const message = this.MessagesService.sendMessage(messagesDTO);
        return message;    
    }

    

}