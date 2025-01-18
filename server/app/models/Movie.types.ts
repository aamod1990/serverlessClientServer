import { Document, Model } from "mongoose"; 

// These fields represent fields of collection 
// and name of the collection is Employee 
export interface IMovie { 
    movieId:Number,
    name: String,
    details: String,
    genre: String,
    actor: String,
    releaseDate: Date
} 

export interface IMovieDocument extends IMovie, Document { } 
export interface IMovieModel extends Model<IMovieDocument> { }
