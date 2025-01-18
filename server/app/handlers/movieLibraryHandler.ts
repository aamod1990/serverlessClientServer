import { container } from "tsyringe";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { MovieLibraryService } from "../service/movieLibraryService";

const service = container.resolve(MovieLibraryService);

export const addMovie  = async (event: APIGatewayProxyEventV2) => {
    return await service.createMovie(event);
};
export const listMovies  = async (event: APIGatewayProxyEventV2) => {
    return await service.listAllMovies(event);
};
export const getMovie  = async (event: APIGatewayProxyEventV2) => {
    return await service.getMovieDetails(event);
};
export const editMovie  = async (event: APIGatewayProxyEventV2) => {
    return await service.updateMovie(event);
};
export const deleteMovie  = async (event: APIGatewayProxyEventV2) => {
    return await service.removeMovie(event);
};
export const searchMovie  = async (event: APIGatewayProxyEventV2) => {
    return await service.findMovies(event);
};