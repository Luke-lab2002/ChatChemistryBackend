
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  isActive: boolean;

  @Prop()
  RoomChat: [{type: Types.ObjectId, ref: 'RoomChat' }]
}

export const UserSchema = SchemaFactory.createForClass(User);
