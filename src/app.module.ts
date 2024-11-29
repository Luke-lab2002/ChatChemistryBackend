import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomChatModule } from './modules/roomchat/roomchat.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/chemistry'),
    UserModule,
    RoomChatModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
