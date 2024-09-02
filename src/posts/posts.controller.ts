import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { PostsService } from './posts.service';
import { CreatePostDto, UpdatePostDto } from './posts.dto';
import { ParsePositiveIntPipe } from 'src/common/pipes';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ summary: '포스트 리스트 조회' })
  @Get()
  async findPosts() {
    return await this.postsService.findPosts();
  }

  @ApiOperation({ summary: '포스트 작성' })
  @Post()
  async createPost(@Body() createPostDto: CreatePostDto) {
    await this.postsService.createPost(createPostDto);
  }

  @ApiOperation({ summary: '포스트 수정' })
  @Put(':id')
  async updatePost(@Param('id', ParsePositiveIntPipe) postId: number, @Body() updatePostDto: UpdatePostDto) {
    await this.postsService.updatePost(postId, updatePostDto);
  }

  @ApiOperation({ summary: '포스트 삭제' })
  @Delete(':id')
  async deletePost(@Param('id', ParsePositiveIntPipe) postId: number) {
    await this.postsService.deletePost(postId);
  }
}
