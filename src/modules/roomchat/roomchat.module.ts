import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RoomChat, RoomChatSchema } from "src/schemas/roomchat.schema";
import { RoomChatService } from "./roomchat.service";
import { RoomChatController } from "./roomchat.controller";
import { Messages, MessagesSchema } from "src/schemas/messages.schema";

@Module({
    imports:[MongooseModule.forFeature([
        {name:RoomChat.name, schema:RoomChatSchema},
        {name:Messages.name, schema:MessagesSchema}

    ])],
    controllers:[RoomChatController],
    providers:[RoomChatService]
})
export class RoomChatModule{}