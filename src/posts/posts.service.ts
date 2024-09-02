import { Injectable } from '@nestjs/common';

import { PostsRepository } from './posts.repository';
import { CreatePostDto } from './posts.dto';
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

    return post;
  }
}
