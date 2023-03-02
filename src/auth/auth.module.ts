import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User, UserSchema } from '../database/user';
import {
  access_tokenStratergie,
  refresh_tokenStratergie,
} from 'src/stratergies';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [AuthController],
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),JwtModule],
  providers: [AuthService],
})
export class AuthModule { }