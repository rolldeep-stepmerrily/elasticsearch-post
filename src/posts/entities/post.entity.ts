import { ApiProperty } from '@nestjs/swagger';
import { Post as PostModel } from '@prisma/client';
import { ArrayMaxSize, IsArray, IsString, MaxLength } from 'class-validator';

import { BaseEntity } from 'src/common/entities';

export class Post extends BaseEntity implements PostModel {
  id: number;

  @ApiProperty({ description: '제목', required: true, example: '제목' })
  @IsString()
  @MaxLength(20)
  title: string;

  @ApiProperty({ description: '내용', required: true, example: '내용' })
  @IsString()
  @MaxLength(3000)
  content: string;

  @ApiProperty({ description: '태그', required: true, example: ['태그'] })
  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(5)
  tags: string[];
}
