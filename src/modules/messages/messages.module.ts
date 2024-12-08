import { Module } from "@nestjs/common";
import { MessagesController } from "./messages.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Messages, MessagesSchema } from "src/schemas/messages.schema";
import { MessagesService } from "./messages.service";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports:[MongooseModule.forFeature([{name:Messages.name, schema:MessagesSchema}]), HttpModule, 
    ConfigModule.forRoot({
      isGlobal: true,
    })],
    controllers:[MessagesController],
    providers:[MessagesService]
})
export class MessageModule{}