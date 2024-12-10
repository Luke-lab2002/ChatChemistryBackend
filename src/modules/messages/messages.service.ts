import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Messages, MessagesDocument } from "src/schemas/messages.schema";
import { messagesDTO } from "./dto/message.dto";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";
import { ConfigService } from "@nestjs/config";
import { RoomChat } from "src/schemas/roomchat.schema";


@Injectable()
export class MessagesService{
    constructor(
    @InjectModel(Messages.name) private messageModel:Model<MessagesDocument>,
    @InjectModel(RoomChat.name) private roomChatModel:Model<RoomChat>,

    private readonly httpService:HttpService,
    private configService: ConfigService
 ){}

    async getListMessagesDB(roomchatId:string){
        const listMessage = await this.messageModel.find({
            roomchatId:roomchatId
        }).exec();

        return listMessage;
    }

    getAllMessagesDB(){
        const listMessage = this.messageModel.find().exec();
        return listMessage;
    }

    async createMessageDB(messagesDTO:messagesDTO){

        const message = new this.messageModel({
            roomchatId: messagesDTO.roomchatId,
            content: messagesDTO.content,
            role: messagesDTO.role
        });

        await this.roomChatModel.updateOne(
            {
                _id:messagesDTO.roomchatId
            },
            {
                 $push:{Messages:message._id}
            }
        )
        
        return message.save();
    }

    async createMessageDBNoDTO(roomchatId:string, content:string, role:string){

        const message = new this.messageModel({
            roomchatId: roomchatId,
            content: content,
            role: role
        });

        await this.roomChatModel.updateOne(
            {
                _id:roomchatId
            },
            {
                 $push:{Messages:message._id}
            }
        )
        
        return message.save();
    }

    async deleteMessageDB(id:string){
        const message = await this.messageModel.findOneAndDelete({
            _id:id
        });

        await this.roomChatModel.updateOne(
            {
                _id:message.roomchatId
            },
            {
                 $pull:{Messages:message._id}
            }
        )
        
        return message;

    }

    async sendMessage(messagesDTO:messagesDTO){
        const create_message = await this.createMessageDB(messagesDTO)
        const messages = await this.getListMessagesDB(messagesDTO.roomchatId)

        const conversation = messages.map(item => {
            return {
              role: item.role,
              content: item.content
            };
        }); 

        const chatbotmessage = await this.sendToMistral(conversation)

        const ai_message = this.createMessageDBNoDTO(
            messagesDTO.roomchatId,
            chatbotmessage["message"],
            "assistant"            
        )


        return ai_message;
    }

    async sendToMistral(messages){
        const url = this.configService.get<string>("CHATBOT_URL") ;
        const payload = {"conversation":messages}

        try {
            const response = await lastValueFrom(
              this.httpService.post(url, payload)
            );
            return response.data;
          } catch (error) {
            console.error('Error while calling chatbot API:', error);
            throw new Error('Failed to send message to chatbot');
          }

    }
}