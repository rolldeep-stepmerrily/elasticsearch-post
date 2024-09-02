import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto, UpdatePostDto } from './posts.dto';
import dayjs from 'dayjs';

@Injectable()
export class PostsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findPosts() {
    try {
      return await this.prismaService.post.findMany({
        where: { deletedAt: null },
        select: { id: true, title: true, content: true, tags: true },
      });
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

  async findPost(postId: number) {
    try {
      return await this.prismaService.post.findUnique({
        where: { id: postId, deletedAt: null },
        select: { id: true, title: true, content: true, tags: true },
      });
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException();
    }
  }

  async updatePost(postId: number, { title, content, tags }: UpdatePostDto) {
    try {
      return await this.prismaService.post.update({
        where: { id: postId },
        data: { title, content, tags },
        select: { id: true, title: true, content: true, tags: true },
      });
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException();
    }
  }

  async deletePost(postId: number) {
    try {
      return await this.prismaService.post.update({
        where: { id: postId },
        data: { deletedAt: dayjs().toISOString() },
      });
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException();
    }
  }
}
