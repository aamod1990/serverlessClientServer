import * as Mongoose from "mongoose"; 

const MovieSchema = new Mongoose.Schema({ 
    movieId:Number,
    name: String,
    details: String,
    genre: String,
    actor: String,
    releaseDate: Date
}); 

export default MovieSchema;