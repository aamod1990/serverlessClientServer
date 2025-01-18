"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieModel = void 0;
const mongoose_1 = require("mongoose");
const Movie_schema_1 = __importDefault(require("./Movie.schema"));
exports.MovieModel = (0, mongoose_1.model)("movie", Movie_schema_1.default);
//# sourceMappingURL=Movie.model.js.map