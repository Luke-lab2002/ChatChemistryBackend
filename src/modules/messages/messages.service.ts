import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Messages, MessagesDocument } from "src/schemas/messages.schema";
import { messagesDTO } from "./dto/message.dto";

@Injectable()
export class MessagesService{
    constructor(@InjectModel(Messages.name) private messageModel:Model<MessagesDocument> ){}

    getListMessagesDB(){
        const listMessage = this.messageModel.find().exec();
        return listMessage;
    }

    createRoomChatDB(messagesDTO:messagesDTO){
        const message = new this.messageModel({
            context:messagesDTO.context,
            roomchatId:messagesDTO.roomchatId,
            role:messagesDTO.role
        });
        return message.save();
    }
}