import { Controller, Get, Post, Body, Param, Put, Delete } from "@nestjs/common";
import { RoomChatService } from "./roomchat.service";
import { RoomChatDTO } from "./dto/roomcha.dto";

@Controller("roomchat")
export class RoomChatController{

    constructor(private readonly RoomChatService:RoomChatService){

    }

    @Get("userid/:Id")
    HandleGetListRoom(@Param("Id") Id:string){
        return this.RoomChatService.getListRoomChatDB(Id);
    }

    @Post("/create-roomchat")
    HandleCreateRoomChat(@Body() RoomChatDTO:RoomChatDTO){
        return this.RoomChatService.createRoomChatDB(RoomChatDTO);
    }

    @Get("/:Id")
    HandleGetRoomChat(@Param("Id") Id:string){
        return this.RoomChatService.getRoomChatDB(Id);
    }

    @Put("/:Id")
    HandleUpdateNameRoomChat(@Param("Id") Id:string, @Body() RoomChatDTO:RoomChatDTO){
        return this.RoomChatService.updateNameRoomChatDB(Id, RoomChatDTO)
    }

    @Delete("/:Id")
    HandleDeleteRoomChat(@Param("Id") Id:string){
        return this.RoomChatService.deleteRoomChatDB(Id)
        // return "Hello world"
    }
    
}