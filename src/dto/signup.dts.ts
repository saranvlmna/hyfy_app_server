import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class signupDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsNumber()
  @IsNotEmpty()
  public age: number;

  @IsNumber()
  @IsNotEmpty()
  public number: number;

  @IsString()
  @IsNotEmpty()
  public state: string;
  

  @IsString()
  @IsNotEmpty()
  public city: string;

  @IsString()
  @IsNotEmpty()
  public password: string;

  @IsString()
  @IsNotEmpty()
  public rToken: string;
}
