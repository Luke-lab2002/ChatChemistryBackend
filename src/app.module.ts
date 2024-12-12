import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomChatModule } from './modules/roomchat/roomchat.module';
import { MessageModule } from './modules/messages/messages.module';
import { LoginModule } from './modules/login/login.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL),
    UserModule,
    RoomChatModule,
    MessageModule,
    LoginModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
