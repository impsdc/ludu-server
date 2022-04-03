import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Mongoose } from 'mongoose';
import { Store } from '../../stores/schemas/store.schema';

@Schema()
export class Location extends Document {
  @Prop({ unique: true })
  name: string;

  @Prop({ type: [Types.ObjectId], ref: 'store' })
  store: Store;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
