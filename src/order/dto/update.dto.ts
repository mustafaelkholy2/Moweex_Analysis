import { PartialType } from '@nestjs/mapped-types';
import { AddOrder } from './add.dto';

export class OrderUpdate extends PartialType(AddOrder) { }