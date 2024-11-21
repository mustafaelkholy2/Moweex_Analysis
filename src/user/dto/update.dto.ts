import { PartialType } from '@nestjs/mapped-types';
import { userRegisterDto } from './register.dto';

export class userUpdateDto extends PartialType(userRegisterDto) { }