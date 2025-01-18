import { expect } from 'chai';
import sinon from 'sinon';
import { APIGatewayProxyEventV2 } from "aws-lambda";
import 'mocha';
import { MovieLibraryService } from "../app/service/movieLibraryService";

const services = new MovieLibraryService;

const mock_data_for_getMovieDetails = {
  statusCode: 200,
  headers: { 'Access-Control-Allow-Origin': '*' },
  body: '{"message":"success","data":{"statusCode":200,"body":{"_id":"66a6751919cda9c55634146d","movieId":1,"name":"sole311113","details":"The film is about two criminals, Veeru (Dharmendra) and Jai (Amitabh Bachchan), hired by a retired police officer (Sanjeev Kumar) to capture the ruthless dacoit ","genre":"Sippy, and written by Salim–Javed. The film is about two criminals, Veeru (Dharmendra) and Jai","actor":"Dharmendra,Amitabh Bachchan,Sanjeev Kumar","releaseDate":"1975-11-08T18:30:00.000Z","rating":10,"__v":0}}}'
}

const mock_listAllMovies = {
  statusCode: 200,
  headers: { 'Access-Control-Allow-Origin': '*' },
  body: '{"message":"success","data":{"statusCode":200,"body":[{"_id":"66a6751919cda9c55634146d","movieId":1,"name":"sole311113","details":"The film is about two criminals, Veeru (Dharmendra) and Jai (Amitabh Bachchan), hired by a retired police officer (Sanjeev Kumar) to capture the ruthless dacoit ","genre":"Sippy, and written by Salim–Javed. The film is about two criminals, Veeru (Dharmendra) and Jai","actor":"Dharmendra,Amitabh Bachchan,Sanjeev Kumar","releaseDate":"1975-11-08T18:30:00.000Z","rating":10,"__v":0},{"_id":"66a79ed163a906776302353e","movieId":2,"name":"gumnaam","details":"The film is about two criminals, Veeru (Dharmendra) and Jai (Amitabh Bachchan), hired by a retired police officer (Sanjeev Kumar) to capture the ruthless dacoit ","genre":"Sippy, and written by Salim–Javed. The film is about two criminals, Veeru (Dharmendra) and Jai","actor":"Dharmendra,Amitabh Bachchan,Sanjeev Kumar","releaseDate":"1975-11-08T18:30:00.000Z","rating":10,"__v":0}]}}'
}

const mock_searchMovie = {
  statusCode: 200,
  headers: { 'Access-Control-Allow-Origin': '*' },
  body: '{"message":"success","data":{"statusCode":200,"body":[{"_id":"66a6751919cda9c55634146d","movieId":1,"name":"sole311113","details":"The film is about two criminals, Veeru (Dharmendra) and Jai (Amitabh Bachchan), hired by a retired police officer (Sanjeev Kumar) to capture the ruthless dacoit ","genre":"Sippy, and written by Salim–Javed. The film is about two criminals, Veeru (Dharmendra) and Jai","actor":"Dharmendra,Amitabh Bachchan,Sanjeev Kumar","releaseDate":"1975-11-08T18:30:00.000Z","rating":10,"__v":0},{"_id":"66a79ed163a906776302353e","movieId":2,"name":"gumnaam","details":"The film is about two criminals, Veeru (Dharmendra) and Jai (Amitabh Bachchan), hired by a retired police officer (Sanjeev Kumar) to capture the ruthless dacoit ","genre":"Sippy, and written by Salim–Javed. The film is about two criminals, Veeru (Dharmendra) and Jai","actor":"Dharmendra,Amitabh Bachchan,Sanjeev Kumar","releaseDate":"1975-11-08T18:30:00.000Z","rating":10,"__v":0}]}}'
}
const mock_create_movie = {
  statusCode: 200,
  headers: { 'Access-Control-Allow-Origin': '*' },
  body: '{"message":"success","data":{"statusCode":200,"body":{"movieId":3,"name":"gumnaam","details":"The film is about two criminals, Veeru (Dharmendra) and Jai (Amitabh Bachchan), hired by a retired police officer (Sanjeev Kumar) to capture the ruthless dacoit ","genre":"Sippy, and written by Salim–Javed. The film is about two criminals, Veeru (Dharmendra) and Jai","actor":"Dharmendra,Amitabh Bachchan,Sanjeev Kumar","releaseDate":"1975-11-08T18:30:00.000Z","rating":10,"_id":"66a7b40cd47cf63cab52647f","__v":0}}}'
}

const mock_update_movie = {
  statusCode: 200,
  headers: { 'Access-Control-Allow-Origin': '*' },
  body: '{"message":"success","data":{"statusCode":200,"body":{"_id":"66a7b40cd47cf63cab52647f","movieId":3,"name":"gumnaam-unittest","details":"The film is about two criminals, Veeru (Dharmendra) and Jai (Amitabh Bachchan), hired by a retired police officer (Sanjeev Kumar) to capture the ruthless dacoit ","genre":"Sippy, and written by Salim–Javed. The film is about two criminals, Veeru (Dharmendra) and Jai","actor":"Dharmendra,Amitabh Bachchan,Sanjeev Kumar","releaseDate":"1975-11-08T18:30:00.000Z","rating":10,"__v":0}}}'
}
const mock_delete_movie = {
  statusCode: 200,
  headers: { 'Access-Control-Allow-Origin': '*' },
  body: '{"message":"success","data":{"statusCode":200,"body":"Movie deleted"}}'
}
describe('MovieLibrary Handler', () => {
  afterEach(() => {
    sinon.restore();
  });
  it('get movie details based on id', async () => {
  
    const event: APIGatewayProxyEventV2 = Object({pathParameters: { id:'1'}}) ;
    const result = await services.getMovieDetails(event);
    // console.log("result",result);
    //expect(result.statusCode).to.equal(200);
    // expect(result.body).to.equal(mock_data_for_getMovieDetails);
  });
  it('get all movies', async () => {
    const event: APIGatewayProxyEventV2 = Object({body: {}}) ;
    let result = await services.listAllMovies(event);
    // console.log("result",result);
    //expect(result.statusCode).to.equal(200);
    //expect(result.body).to.equal(mock_listAllMovies);
  });
  it('search movies', async () => {
    const event: APIGatewayProxyEventV2 = Object({pathParameters: { name:'sole'}}) ;
    let result = await services.listAllMovies(event);
      // console.log("result",result);
      //expect(result.statusCode).to.equal(200);
      //expect(result.body).to.equal(mock_searchMovie);
  });

  it('create movies', async () => {
    const event: APIGatewayProxyEventV2 = Object({body:'{"movieId":"3","name":"gumnaam","details":"The film is about two criminals, Veeru (Dharmendra) and Jai (Amitabh Bachchan), hired by a retired police officer (Sanjeev Kumar) to capture the ruthless dacoit ","genre":"Sippy, and written by Salim–Javed. The film is about two criminals, Veeru (Dharmendra) and Jai","actor":"Dharmendra,Amitabh Bachchan,Sanjeev Kumar","releaseDate":"11/09/1975","rating":10}'}) ;
    let result = await services.createMovie(event);
      //console.log("result",result);
      //expect(result.statusCode).to.equal(200);
      //expect(result.body).to.equal(mock_create_movie);
  });
  it('update movies', async () => {
    const event: APIGatewayProxyEventV2 = Object({pathParameters: { id:'3'},body:'{"movieId":"3","name":"gumnaam-unittest","details":"The film is about two criminals, Veeru (Dharmendra) and Jai (Amitabh Bachchan), hired by a retired police officer (Sanjeev Kumar) to capture the ruthless dacoit ","genre":"Sippy, and written by Salim–Javed. The film is about two criminals, Veeru (Dharmendra) and Jai","actor":"Dharmendra,Amitabh Bachchan,Sanjeev Kumar","releaseDate":"11/09/1975","rating":10}'}) ;
    let result = await services.updateMovie(event);
      // console.log("result",result);
      //expect(result.statusCode).to.equal(200);
      //expect(result.body).to.equal(mock_update_movie);
  })
  it('delete movies', async () => {
    const event: APIGatewayProxyEventV2 = Object({pathParameters: { id:'3'}}) ;
    let result = await services.removeMovie(event);
      //console.log("result",result);
      //expect(result.statusCode).to.equal(200);
      //expect(result.body).to.equal(mock_delete_movie);
  })
});


