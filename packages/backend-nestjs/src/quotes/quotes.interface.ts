import { Document } from "mongoose";

export type TQuote = {
  quote: string;
  author: string;
} & Document;