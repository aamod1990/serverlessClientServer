import { MovieModel } from "../models/Movie.model";
import { connect } from "../utility/database";
connect();
export class movieLibraryRepository {
  constructor() {}
  async addMovie({name,details,genre,actor,releaseDate,rating}:any):Promise<any>{
    const newMovie = new MovieModel({name,details,genre,actor,releaseDate,rating});
    newMovie.save().then((movie) => {
      console.log('User created:', movie);
      return movie;
    }).catch((error) => {
      console.error('Error creating user:', error);
    });
  }
//   async addMovie({ phone, email, password, salt, userType }: UserModel) {
//     const client = await DBClient();
//     await client.connect();
//     const queryString =
//       "INSERT INTO users(phone,email,password,salt,user_type) VALUES($1,$2,$3,$4,$5) RETURNING *";
//     const values = [phone, email, password, salt, userType];
//     const result = await client.query(queryString, values);
//     await client.end();
//     if (result.rowCount > 0) {
//       return result.rows[0] as UserModel;
//     }
//   }

//   async findAccount(email: string) {
//     const client = await DBClient();
//     await client.connect();
//     const queryString =
//       "SELECT user_id, email, password, phone, salt FROM users WHERE email = $1";
//     const values = [email];
//     const result = await client.query(queryString, values);
//     await client.end();
//     if (result.rowCount < 1) {
//       throw new Error("user does not exist with provided email id!");
//     }
//     return result.rows[0] as UserModel;
//   }
}