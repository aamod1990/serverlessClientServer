import * as mongoose from 'mongoose'; 

export const connect = () => { 

// we will accommodate the connection string in enrolment file 
const mongoDB = 'mongodb://127.0.0.1:27017/movieLibrary';

mongoose.connect(mongoDB)
  .then(() => {
   // console.log('Successfully connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
}
