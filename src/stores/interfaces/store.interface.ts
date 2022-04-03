import { Document } from 'mongoose';

export interface IStore extends Document {
  readonly name: string;
  readonly address: string;
  readonly owner: string;
  readonly phone: string;
  readonly dateCreation: Date;
}
