"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieLibraryService = void 0;
const response_1 = require("../utility/response");
// import { autoInjectable } from "tsyringe";
const class_transformer_1 = require("class-transformer");
const MovieLibaryInput_1 = require("../models/dto/MovieLibaryInput");
const errors_1 = require("../utility/errors");
const Movie_model_1 = require("../models/Movie.model");
const database_1 = require("../utility/database");
// @autoInjectable()
class MovieLibraryService {
    constructor() {
    }
    createMovie(event) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, database_1.connect)();
                const input = (0, class_transformer_1.plainToClass)(MovieLibaryInput_1.MovieLibaryInput, JSON.parse(event.body));
                const error = yield (0, errors_1.AppValidationError)(input);
                if (error)
                    return (0, response_1.ErrorResponse)(404, error);
                let data = JSON.parse(event.body || '{}');
                if (!data.movieId) {
                    function getRandomInt(min, max) {
                        min = Math.ceil(min);
                        max = Math.floor(max);
                        return Math.floor(Math.random() * (max - min + 1) + min);
                    }
                    data.movieId = getRandomInt(1, 10);
                }
                const newMovie = new Movie_model_1.MovieModel(data);
                const movie = yield newMovie.save();
                return (0, response_1.SucessResponse)({
                    statusCode: 200,
                    body: movie,
                });
            }
            catch (error) {
                console.log(error);
                return (0, response_1.ErrorResponse)(500, error);
            }
        });
    }
    listAllMovies(event) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, database_1.connect)();
                //const data = JSON.parse(event.body || '{}');
                const movies = yield Movie_model_1.MovieModel.find();
                return (0, response_1.SucessResponse)({
                    statusCode: 200,
                    body: movies,
                });
            }
            catch (error) {
                console.log(error);
                return (0, response_1.ErrorResponse)(500, error);
            }
        });
    }
    getMovieDetails(event) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                yield (0, database_1.connect)();
                const movie = yield Movie_model_1.MovieModel.findOne({ movieId: (_a = event.pathParameters) === null || _a === void 0 ? void 0 : _a.id });
                if (!movie) {
                    return (0, response_1.ErrorResponse)(404, { message: 'Movie not found' });
                }
                return (0, response_1.SucessResponse)({
                    statusCode: 200,
                    body: movie,
                });
            }
            catch (error) {
                console.log(error);
                return (0, response_1.ErrorResponse)(500, error);
            }
        });
    }
    updateMovie(event) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const input = (0, class_transformer_1.plainToClass)(MovieLibaryInput_1.MovieLibaryInput, JSON.parse(event.body));
                const error = yield (0, errors_1.AppValidationError)(input);
                if (error)
                    return (0, response_1.ErrorResponse)(404, error);
                yield (0, database_1.connect)();
                const data = JSON.parse(event.body || '{}');
                const movie = yield Movie_model_1.MovieModel.findOneAndUpdate({ movieId: (_a = event.pathParameters) === null || _a === void 0 ? void 0 : _a.id }, data, { new: true });
                if (!movie) {
                    return (0, response_1.ErrorResponse)(404, { message: 'Movie not found' });
                }
                return (0, response_1.SucessResponse)({
                    statusCode: 200,
                    body: movie,
                });
            }
            catch (error) {
                console.log(error);
                return (0, response_1.ErrorResponse)(500, error);
            }
        });
    }
    removeMovie(event) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                yield (0, database_1.connect)();
                const movie = yield Movie_model_1.MovieModel.findOneAndDelete({ movieId: (_a = event.pathParameters) === null || _a === void 0 ? void 0 : _a.id });
                if (!movie) {
                    return (0, response_1.ErrorResponse)(404, { message: 'Movie not found' });
                }
                return (0, response_1.SucessResponse)({
                    statusCode: 200,
                    body: "Movie deleted",
                });
            }
            catch (error) {
                console.log(error);
                return (0, response_1.ErrorResponse)(500, error);
            }
        });
    }
    findMovies(event) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                yield (0, database_1.connect)();
                const movieName = (_a = event.pathParameters) === null || _a === void 0 ? void 0 : _a.name;
                const query = {};
                query.name = { $regex: movieName, $options: 'i' };
                const movies = yield Movie_model_1.MovieModel.find(query);
                return (0, response_1.SucessResponse)({
                    statusCode: 200,
                    body: movies,
                });
            }
            catch (error) {
                console.log(error);
                return (0, response_1.ErrorResponse)(500, error);
            }
        });
    }
}
exports.MovieLibraryService = MovieLibraryService;
//# sourceMappingURL=movieLibraryService.js.map