import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document, Types} from "mongoose";
import {Location} from "./location.entity";
import {Cuisine} from "./cuisine.entity";

@Schema({ timestamps: true})
export class Restaurant extends Document {
  
  @Prop({ type: String, isRequired: true, unique: true })
  nameEn: string;
  
  @Prop({ type: String, isRequired: true, unique: true })
  nameAr: string;
  
  @Prop({ type: Location, isRequired: true })
  location: Location;
  
  @Prop({ type: [Types.ObjectId], ref: 'Cuisine', isRequired: true })
  cuisines: Types.ObjectId[];
  
  @Prop({ type: [Types.ObjectId], ref: 'User', isRequired: true })
  users: Types.ObjectId[];
  
  @Prop({ type: Date, isRequired: true })
  createdAt: Date;
  
  @Prop({ type: Date, isRequired: true })
  updatedAt: Date;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);