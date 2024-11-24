import { PartialType } from '@nestjs/mapped-types';
import { AddProduct } from './add.dto';

export class productUpdate extends PartialType(AddProduct) { }