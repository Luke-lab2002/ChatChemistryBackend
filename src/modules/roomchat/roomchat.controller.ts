import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { RoomChatService } from "./roomchat.service";
import { RoomChatDTO } from "./dto/roomcha.dto";

@Controller("roomchat")
export class RoomChatController{

    constructor(private readonly RoomChatService:RoomChatService){

    }

    @Get()
    HandleGetListRoom(){
        return this.RoomChatService.getListRoomChatDB();
    }

    @Post("/create-roomchat")
    HandleCreateRoomChat(@Body() RoomChatDTO:RoomChatDTO){
        return this.RoomChatService.createRoomChatDB(RoomChatDTO);
    }

    @Get(":Id")
    HandleGetRoomChat(@Param("Id") Id:string){
        return this.RoomChatService.getRoomChatDB(Id);
    }
    
}