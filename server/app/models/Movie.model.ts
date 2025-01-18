import { model } from "mongoose"; 
import { IMovieDocument } from "./Movie.types"; 
import MovieSchema from "./Movie.schema"; 

export const MovieModel = model<IMovieDocument>("movie", 
    MovieSchema 
)
