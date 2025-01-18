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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = __importDefault(require("sinon"));
require("mocha");
const movieLibraryService_1 = require("../app/service/movieLibraryService");
const services = new movieLibraryService_1.MovieLibraryService;
const mock_data_for_getMovieDetails = {
    statusCode: 200,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: '{"message":"success","data":{"statusCode":200,"body":{"_id":"66a6751919cda9c55634146d","movieId":1,"name":"sole311113","details":"The film is about two criminals, Veeru (Dharmendra) and Jai (Amitabh Bachchan), hired by a retired police officer (Sanjeev Kumar) to capture the ruthless dacoit ","genre":"Sippy, and written by Salim–Javed. The film is about two criminals, Veeru (Dharmendra) and Jai","actor":"Dharmendra,Amitabh Bachchan,Sanjeev Kumar","releaseDate":"1975-11-08T18:30:00.000Z","rating":10,"__v":0}}}'
};
const mock_listAllMovies = {
    statusCode: 200,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: '{"message":"success","data":{"statusCode":200,"body":[{"_id":"66a6751919cda9c55634146d","movieId":1,"name":"sole311113","details":"The film is about two criminals, Veeru (Dharmendra) and Jai (Amitabh Bachchan), hired by a retired police officer (Sanjeev Kumar) to capture the ruthless dacoit ","genre":"Sippy, and written by Salim–Javed. The film is about two criminals, Veeru (Dharmendra) and Jai","actor":"Dharmendra,Amitabh Bachchan,Sanjeev Kumar","releaseDate":"1975-11-08T18:30:00.000Z","rating":10,"__v":0},{"_id":"66a79ed163a906776302353e","movieId":2,"name":"gumnaam","details":"The film is about two criminals, Veeru (Dharmendra) and Jai (Amitabh Bachchan), hired by a retired police officer (Sanjeev Kumar) to capture the ruthless dacoit ","genre":"Sippy, and written by Salim–Javed. The film is about two criminals, Veeru (Dharmendra) and Jai","actor":"Dharmendra,Amitabh Bachchan,Sanjeev Kumar","releaseDate":"1975-11-08T18:30:00.000Z","rating":10,"__v":0}]}}'
};
const mock_searchMovie = {
    statusCode: 200,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: '{"message":"success","data":{"statusCode":200,"body":[{"_id":"66a6751919cda9c55634146d","movieId":1,"name":"sole311113","details":"The film is about two criminals, Veeru (Dharmendra) and Jai (Amitabh Bachchan), hired by a retired police officer (Sanjeev Kumar) to capture the ruthless dacoit ","genre":"Sippy, and written by Salim–Javed. The film is about two criminals, Veeru (Dharmendra) and Jai","actor":"Dharmendra,Amitabh Bachchan,Sanjeev Kumar","releaseDate":"1975-11-08T18:30:00.000Z","rating":10,"__v":0},{"_id":"66a79ed163a906776302353e","movieId":2,"name":"gumnaam","details":"The film is about two criminals, Veeru (Dharmendra) and Jai (Amitabh Bachchan), hired by a retired police officer (Sanjeev Kumar) to capture the ruthless dacoit ","genre":"Sippy, and written by Salim–Javed. The film is about two criminals, Veeru (Dharmendra) and Jai","actor":"Dharmendra,Amitabh Bachchan,Sanjeev Kumar","releaseDate":"1975-11-08T18:30:00.000Z","rating":10,"__v":0}]}}'
};
const mock_create_movie = {
    statusCode: 200,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: '{"message":"success","data":{"statusCode":200,"body":{"movieId":3,"name":"gumnaam","details":"The film is about two criminals, Veeru (Dharmendra) and Jai (Amitabh Bachchan), hired by a retired police officer (Sanjeev Kumar) to capture the ruthless dacoit ","genre":"Sippy, and written by Salim–Javed. The film is about two criminals, Veeru (Dharmendra) and Jai","actor":"Dharmendra,Amitabh Bachchan,Sanjeev Kumar","releaseDate":"1975-11-08T18:30:00.000Z","rating":10,"_id":"66a7b40cd47cf63cab52647f","__v":0}}}'
};
const mock_update_movie = {
    statusCode: 200,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: '{"message":"success","data":{"statusCode":200,"body":{"_id":"66a7b40cd47cf63cab52647f","movieId":3,"name":"gumnaam-unittest","details":"The film is about two criminals, Veeru (Dharmendra) and Jai (Amitabh Bachchan), hired by a retired police officer (Sanjeev Kumar) to capture the ruthless dacoit ","genre":"Sippy, and written by Salim–Javed. The film is about two criminals, Veeru (Dharmendra) and Jai","actor":"Dharmendra,Amitabh Bachchan,Sanjeev Kumar","releaseDate":"1975-11-08T18:30:00.000Z","rating":10,"__v":0}}}'
};
const mock_delete_movie = {
    statusCode: 200,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: '{"message":"success","data":{"statusCode":200,"body":"Movie deleted"}}'
};
describe('MovieLibrary Handler', () => {
    afterEach(() => {
        sinon_1.default.restore();
    });
    it('get movie details based on id', () => __awaiter(void 0, void 0, void 0, function* () {
        const event = Object({ pathParameters: { id: '1' } });
        const result = yield services.getMovieDetails(event);
        // console.log("result",result);
        //expect(result.statusCode).to.equal(200);
        // expect(result.body).to.equal(mock_data_for_getMovieDetails);
    }));
    it('get all movies', () => __awaiter(void 0, void 0, void 0, function* () {
        const event = Object({ body: {} });
        let result = yield services.listAllMovies(event);
        // console.log("result",result);
        //expect(result.statusCode).to.equal(200);
        //expect(result.body).to.equal(mock_listAllMovies);
    }));
    it('search movies', () => __awaiter(void 0, void 0, void 0, function* () {
        const event = Object({ pathParameters: { name: 'sole' } });
        let result = yield services.listAllMovies(event);
        // console.log("result",result);
        //expect(result.statusCode).to.equal(200);
        //expect(result.body).to.equal(mock_searchMovie);
    }));
    it('create movies', () => __awaiter(void 0, void 0, void 0, function* () {
        const event = Object({ body: '{"movieId":"3","name":"gumnaam","details":"The film is about two criminals, Veeru (Dharmendra) and Jai (Amitabh Bachchan), hired by a retired police officer (Sanjeev Kumar) to capture the ruthless dacoit ","genre":"Sippy, and written by Salim–Javed. The film is about two criminals, Veeru (Dharmendra) and Jai","actor":"Dharmendra,Amitabh Bachchan,Sanjeev Kumar","releaseDate":"11/09/1975","rating":10}' });
        let result = yield services.createMovie(event);
        //console.log("result",result);
        //expect(result.statusCode).to.equal(200);
        //expect(result.body).to.equal(mock_create_movie);
    }));
    it('update movies', () => __awaiter(void 0, void 0, void 0, function* () {
        const event = Object({ pathParameters: { id: '3' }, body: '{"movieId":"3","name":"gumnaam-unittest","details":"The film is about two criminals, Veeru (Dharmendra) and Jai (Amitabh Bachchan), hired by a retired police officer (Sanjeev Kumar) to capture the ruthless dacoit ","genre":"Sippy, and written by Salim–Javed. The film is about two criminals, Veeru (Dharmendra) and Jai","actor":"Dharmendra,Amitabh Bachchan,Sanjeev Kumar","releaseDate":"11/09/1975","rating":10}' });
        let result = yield services.updateMovie(event);
        // console.log("result",result);
        //expect(result.statusCode).to.equal(200);
        //expect(result.body).to.equal(mock_update_movie);
    }));
    it('delete movies', () => __awaiter(void 0, void 0, void 0, function* () {
        const event = Object({ pathParameters: { id: '3' } });
        let result = yield services.removeMovie(event);
        //console.log("result",result);
        //expect(result.statusCode).to.equal(200);
        //expect(result.body).to.equal(mock_delete_movie);
    }));
});
//# sourceMappingURL=movies.spec.js.map