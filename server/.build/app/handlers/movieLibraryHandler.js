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
exports.searchMovie = exports.deleteMovie = exports.editMovie = exports.getMovie = exports.listMovies = exports.addMovie = void 0;
const tsyringe_1 = require("tsyringe");
const movieLibraryService_1 = require("../service/movieLibraryService");
const service = tsyringe_1.container.resolve(movieLibraryService_1.MovieLibraryService);
const addMovie = (event) => __awaiter(void 0, void 0, void 0, function* () {
    return yield service.createMovie(event);
});
exports.addMovie = addMovie;
const listMovies = (event) => __awaiter(void 0, void 0, void 0, function* () {
    return yield service.listAllMovies(event);
});
exports.listMovies = listMovies;
const getMovie = (event) => __awaiter(void 0, void 0, void 0, function* () {
    return yield service.getMovieDetails(event);
});
exports.getMovie = getMovie;
const editMovie = (event) => __awaiter(void 0, void 0, void 0, function* () {
    return yield service.updateMovie(event);
});
exports.editMovie = editMovie;
const deleteMovie = (event) => __awaiter(void 0, void 0, void 0, function* () {
    return yield service.removeMovie(event);
});
exports.deleteMovie = deleteMovie;
const searchMovie = (event) => __awaiter(void 0, void 0, void 0, function* () {
    return yield service.findMovies(event);
});
exports.searchMovie = searchMovie;
//# sourceMappingURL=movieLibraryHandler.js.map