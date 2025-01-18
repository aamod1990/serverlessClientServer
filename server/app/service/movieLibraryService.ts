import { APIGatewayProxyEventV2 } from "aws-lambda";
import { SucessResponse, ErrorResponse } from "../utility/response";
// import { autoInjectable } from "tsyringe";
import { plainToClass } from "class-transformer"; 
import { MovieLibaryInput } from "../models/dto/MovieLibaryInput";
import { AppValidationError } from "../utility/errors";
import { MovieModel } from "../models/Movie.model";
import { connect } from "../utility/database";
// @autoInjectable()
export class MovieLibraryService {
  constructor() {
  }
    
  async createMovie(event: APIGatewayProxyEventV2) {
    try {
      await connect();
        const input = plainToClass(MovieLibaryInput, JSON.parse(event.body));
        const error = await AppValidationError(input);
        if (error) return ErrorResponse(404, error);
        let data = JSON.parse(event.body || '{}');
        if(!data.movieId){
          function getRandomInt(min:number, max:number) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1) + min);
          }
          data.movieId = getRandomInt(1,10);
        }
        const newMovie = new MovieModel(data);
        const movie = await newMovie.save();
        return SucessResponse( {
          statusCode: 200,
          body: movie,
        });
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }
  async listAllMovies(event: APIGatewayProxyEventV2) {
    try {
        await connect();
       //const data = JSON.parse(event.body || '{}');
        const movies = await MovieModel.find();
        return SucessResponse( {
          statusCode: 200,
          body: movies,
        });
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }
  async getMovieDetails(event: APIGatewayProxyEventV2) {
    try {
        await connect();
        const movie = await MovieModel.findOne({movieId:event.pathParameters?.id});
        if(!movie){
          return ErrorResponse(404,{message: 'Movie not found'})
        }
        return SucessResponse( {
          statusCode: 200,
          body: movie,
        });
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }
  async updateMovie(event: APIGatewayProxyEventV2) {
    try {
        const input = plainToClass(MovieLibaryInput, JSON.parse(event.body));
        const error = await AppValidationError(input);
        if (error) return ErrorResponse(404, error);
        await connect();
        const data = JSON.parse(event.body || '{}');
        const movie = await MovieModel.findOneAndUpdate({movieId:event.pathParameters?.id}, data, { new: true });
        if (!movie) {
          return ErrorResponse(404,{message: 'Movie not found'})
        }
        return SucessResponse( {
          statusCode: 200,
          body: movie,
        });
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }
  async removeMovie(event: APIGatewayProxyEventV2) {
    try {
        await connect();
        const movie = await MovieModel.findOneAndDelete({movieId:event.pathParameters?.id});
        if (!movie) {
          return ErrorResponse(404,{message: 'Movie not found'})
        }
        return SucessResponse({
          statusCode: 200,
          body: "Movie deleted",
        });
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }
  async findMovies(event: APIGatewayProxyEventV2) {
    try {
        await connect();
       const movieName =  event.pathParameters?.name;
       const query: any = {};
       query.name = { $regex: movieName, $options: 'i' };
       const movies = await MovieModel.find(query);
        return SucessResponse( {
          statusCode: 200,
          body: movies,
        });
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }
}