import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { RoomChat, RoomChatDocument } from "src/schemas/roomchat.schema";
import { RoomChatDTO } from "./dto/roomcha.dto";
import { Messages, MessagesDocument } from "src/schemas/messages.schema";

@Injectable()
export class RoomChatService{
    constructor(
        @InjectModel(RoomChat.name) private roomChatModel: Model<RoomChatDocument>,
        @InjectModel(Messages.name) private messagesModel: Model<MessagesDocument>
){}
    
    async getListRoomChatDB(){
        const listRoomChat = await this.roomChatModel.find().exec();
        return listRoomChat;
    }

    async createRoomChatDB(RoomChatDTO:RoomChatDTO){
        const roomchat = new this.roomChatModel({
            name: RoomChatDTO.name,
            userId: RoomChatDTO.userId,
            messages:[]
        });
        return roomchat.save();
    }

    async getRoomChatDB(Id:string){
        const roomChat = await this.roomChatModel
        .findById(Id)
        .exec();
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

    async deleteRoomChatDB(Id:string){
        const roomChat = await this.roomChatModel.deleteOne({
            _id:Id
        })

        await this.messagesModel.deleteMany({
            roomchatId:Id
        })

        return roomChat;

    }

}