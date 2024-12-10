
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Messages } from './messages.schema';

export type RoomChatDocument = HydratedDocument<RoomChat>;

@Schema()
export class RoomChat {
  @Prop()
  name: string;

  @Prop({type: Types.ObjectId, ref:"User"})
  userId: string

  @Prop({type: [{type: Types.ObjectId, ref:"Messages"}]})
  Messages: Messages[]

}

export const RoomChatSchema = SchemaFactory.createForClass(RoomChat);
