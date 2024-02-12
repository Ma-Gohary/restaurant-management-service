import {Prop, Schema} from "@nestjs/mongoose";
import {Document} from "mongoose";

@Schema()
export class Location extends Document {
  @Prop({
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  })
  point: {
    type: string;
    coordinates: number[];
  };
}