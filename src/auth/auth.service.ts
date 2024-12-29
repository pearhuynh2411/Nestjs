import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaClient } from '@prisma/client';
import { error } from 'console';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthService {
  prisma = new PrismaClient();

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService
  ) { }

  async login(body: LoginDto): Promise<string> {
    try {
      const { email, pass_word } = body;
      //get user by email
      const user = await this.prisma.users.findFirst({
        where: { email }
      })
      //check user exist ?
      if (!user) {
        throw new BadRequestException('Email is not exist')
      }
      //check password match hay kh ?
      const checkPass = bcrypt.compareSync(pass_word, user.pass_word)
      //cheat password
      const hashPassword = bcrypt.hashSync(pass_word, 10)
      if (!checkPass) {
        throw new BadRequestException('Password is wrong !')
      }


      //create token
      const token = this.jwtService.sign(
        { data: { user: user.user_id } }, //define payload muốn lưu vào token
        {
          expiresIn: this.configService.get('JWT_EXPIRES_IN'), //thời gian sống của token
          secret: this.configService.get('SECRET_KEY')
        }
      )
      return token
    } catch (error) {
      throw new Error(error)
    }
  }
  async signup(body: CreateUserDto): Promise<any> {
    try {
      let { full_name, email, pass_word, role_id } = body;
      //Get user by email
      const user = await this.prisma.users.findFirst({
        where: { email }
      })
      //check user exists
      if (user) {
        throw new BadRequestException('Email is exist')
      }
      pass_word = bcrypt.hashSync(pass_word, 10);
      const newUser = await this.prisma.users.create({
        data: {
          full_name,
          email,
          pass_word,
          role_id
        }
      })
      //send email welcome
      await this.emailService.sendEmail(email, 'Ê ku, PearHuynh tới nè mày', 'hihi')
      //return user
      return newUser

    } catch (error) {
      throw new Error(error.message)
    }
  }

}
