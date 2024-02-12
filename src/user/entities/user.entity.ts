import {Document, Types} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Cuisine} from "../../restaurant/entities/cuisine.entity";

@Schema({ timestamps: true })
export class User extends Document {
  
  @Prop({ type: String, isRequired: true })
  fullName: string;
  
  @Prop({ type: [Types.ObjectId], ref: 'Cuisine', isRequired: false })
  cuisines: Types.ObjectId[];
  
  @Prop({ type: [Types.ObjectId], ref: 'Restaurant', isRequired: false })
  restaurants: Types.ObjectId[];

  @Prop({ type: Date, isRequired: true })
  createdAt: Date;
  
  @Prop({ type: Date, isRequired: true })
  updatedAt: Date;
  
}

export const UserSchema = SchemaFactory.createForClass(User);
