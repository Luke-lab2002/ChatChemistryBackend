import { Module } from "@nestjs/common";
import { MessagesController } from "./messages.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Messages, MessagesSchema } from "src/schemas/messages.schema";
import { MessagesService } from "./messages.service";

@Module({
    imports:[MongooseModule.forFeature([{name:Messages.name, schema:MessagesSchema}])],
    controllers:[MessagesController],
    providers:[MessagesService]
})
export class MessageModule{}