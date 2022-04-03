import { Document } from 'mongoose';

export interface ILocation extends Document {
  readonly name: string;
}
