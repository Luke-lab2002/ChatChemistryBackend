import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RoomChat, RoomChatSchema } from "src/schemas/roomchat.schema";
import { RoomChatService } from "./roomchat.service";
import { RoomChatController } from "./roomchat.controller";

@Module({
    imports:[MongooseModule.forFeature([{name:RoomChat.name, schema:RoomChatSchema}])],
    controllers:[RoomChatController],
    providers:[RoomChatService]
})
export class RoomChatModule{}