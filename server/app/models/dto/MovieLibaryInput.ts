import { Length, IsInt,IsDate,Min,Max, IsString} from "class-validator";

export class MovieLibaryInput {
  @Length(3, 20)
  name: string;

  @Length(10, 2000)
  details:String;

  @Length(10, 2000)
  genre:String;

  @Length(10, 2000)
  actor:String;

  @IsString()
  releaseDate: Date;
}