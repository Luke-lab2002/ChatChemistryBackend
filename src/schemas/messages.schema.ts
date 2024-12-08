import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type MessagesDocument = HydratedDocument<Messages>;

@Schema()
export class Messages{
    @Prop({type: Types.ObjectId, ref:"RoomChat"})
    roomchatId: string; 

    @Prop()
    content: string;

    @Prop()
    role:string;

}

export const MessagesSchema = SchemaFactory.createForClass(Messages);