import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Store extends Document {
  @Prop()
  name: string;

  @Prop({ unique: true })
  lastName: string;

  @Prop({ unique: true })
  address: string;

  @Prop()
  owner: string;

  @Prop()
  phone: string;

  @Prop()
  dateCreation: Date;

  @Prop({ type: [Types.ObjectId], ref: 'location' })
  location: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Store);
