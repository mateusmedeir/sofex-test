import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

class CreateRecipeIngredientDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly amount: string;
}

export class CreateRecipeDto {
  @ApiProperty({
    example: 'Panquecas',
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    example: [
      {
        name: 'farinha',
        amount: '1 xícara',
      },
      {
        name: 'leite',
        amount: '1 xícara',
      },
      {
        name: 'ovo',
        amount: '1',
      },
    ],
  })
  @IsArray()
  @Type(() => CreateRecipeIngredientDto)
  @IsNotEmpty()
  readonly ingredients: CreateRecipeIngredientDto[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly instructions: string;
}
