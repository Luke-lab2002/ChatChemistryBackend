import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { RoomChat, RoomChatDocument } from "src/schemas/roomchat.schema";
import { RoomChatDTO } from "./dto/roomcha.dto";

@Injectable()
export class RoomChatService{
    constructor(@InjectModel(RoomChat.name) private roomChatModel: Model<RoomChatDocument>){}
    
    getListRoomChatDB(){
        const listRoomChat = this.roomChatModel.find().exec();
        return listRoomChat;
    }

    createRoomChatDB(RoomChatDTO:RoomChatDTO){
        const roomchat = new this.roomChatModel({
            name:RoomChatDTO.name,
            userId:RoomChatDTO.userId
        });
        return roomchat.save();
    }

    getRoomChatDB(Id:string){
        const roomChat = this.roomChatModel.findById(Id);
        return roomChat;
    }

    async updateNameRoomChatDB(Id:string, RoomChatDTO:RoomChatDTO){
        const roomChat = await this.roomChatModel.updateOne({
            _id:Id
        },
        {
            name:RoomChatDTO.name
        }).exec();

        return roomChat;

    }

}