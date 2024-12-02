import { Body, Controller, Get, Post } from "@nestjs/common";
import { MessagesService } from "./messages.service";
import { messagesDTO } from "./dto/message.dto";

@Controller("messages")
export class MessagesController{

    constructor(private readonly MessagesService:MessagesService){}

    @Get()
    HandleGetListMessages(){
        const listMess = this.MessagesService.getListMessagesDB();
        return listMess;
    }

    @Post("/create-mess")
    HandleCreateMessage(@Body() messagesDTO:messagesDTO){
        const message = this.MessagesService.createRoomChatDB(messagesDTO);
        return message;    
    }

}