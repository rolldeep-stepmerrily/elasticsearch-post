import { Injectable, NotFoundException } from '@nestjs/common';

import { PostsRepository } from './posts.repository';
import { CreatePostDto, UpdatePostDto } from './posts.dto';
import { SearchService } from 'src/search/search.service';

@Injectable()
export class PostsService {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly searchService: SearchService,
  ) {}

  async findPosts() {
    return await this.postsRepository.findPosts();
  }

  async createPost(createPostDto: CreatePostDto) {
    const post = await this.postsRepository.createPost(createPostDto);

    await this.searchService.indexPost(post);
  }

  async findPost(postId: number) {
    const post = await this.postsRepository.findPost(postId);

    if (!post) {
      throw new NotFoundException();
    }
  }

  async updatePost(postId: number, updatePostDto: UpdatePostDto) {
    await this.postsRepository.findPost(postId);

    const post = await this.postsRepository.updatePost(postId, updatePostDto);

    await this.searchService.updatePost(post);
  }

  async deletePost(postId: number) {
    await this.postsRepository.findPost(postId);

    await this.postsRepository.deletePost(postId);

    await this.searchService.deletePost(postId);
  }
}
