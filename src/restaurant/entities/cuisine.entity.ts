import {Restaurant} from "./restaurant.entity";
import {User} from "../../user/entities/user.entity";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document, Types} from "mongoose";

@Schema({ timestamps: true})
export class Cuisine extends Document {
  
  @Prop({ type: String, isRequired: true })
  nameEn: string;
  
  @Prop({ type: [Types.ObjectId], ref: 'Restaurant', isRequired: true })
  restaurants: Types.ObjectId[];
  
  @Prop({ type: [Types.ObjectId], ref: 'User', isRequired: true })
  users: Types.ObjectId[];
  
  @Prop({ type: Date, isRequired: true })
  createdAt: Date;
  
  @Prop({ type: Date, isRequired: true })
  updatedAt: Date;
}

export const CuisineSchema = SchemaFactory.createForClass(Cuisine);