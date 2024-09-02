import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './posts.dto';

@Injectable()
export class PostsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findPosts() {
    try {
      return await this.prismaService.post.findMany({ select: { id: true, title: true, content: true, tags: true } });
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException();
    }
  }

  async createPost({ title, content, tags }: CreatePostDto) {
    try {
      return await this.prismaService.post.create({
        data: { title, content, tags },
        select: { id: true, title: true, content: true, tags: true },
      });
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException();
    }
  }
}
