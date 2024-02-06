import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class ImageDto {
    @IsNotEmpty({ message: 'Name must not be empty' })
    @IsString({ message: 'Name must be a string' })
    @Length(7, 7, { message: 'The length of the name must be exactly 7 characters.' })
    name!: string;

    @IsNotEmpty({ message: 'data must not be empty' })
    @IsString({ message: 'Data must be a string' })
    @Length(20, 20, { message: 'The length of the data must be exactly 20 characters.' })
    @Matches(/\.(jpg|png|gif)$/, { message: 'Invalid file extension. Only .jpg, .png, and .gif are allowed.' })
    data!: string;
}

export class QueryDto {
    @IsNotEmpty({ message: 'Name must not be empty' })
    @IsString({ message: 'Name must be a string' })
    @Length(7, 7, { message: 'The length of the name must be exactly 7 characters.' })
    name!: string;
}

