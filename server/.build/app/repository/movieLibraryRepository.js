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
exports.movieLibraryRepository = void 0;
const Movie_model_1 = require("../models/Movie.model");
const database_1 = require("../utility/database");
(0, database_1.connect)();
class movieLibraryRepository {
    constructor() { }
    addMovie(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, details, genre, actor, releaseDate, rating }) {
            const newMovie = new Movie_model_1.MovieModel({ name, details, genre, actor, releaseDate, rating });
            newMovie.save().then((movie) => {
                console.log('User created:', movie);
                return movie;
            }).catch((error) => {
                console.error('Error creating user:', error);
            });
        });
    }
}
exports.movieLibraryRepository = movieLibraryRepository;
//# sourceMappingURL=movieLibraryRepository.js.map