import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { IPost } from 'src/posts/posts.interface';

@Injectable()
export class SearchService {
  private readonly index = 'posts';

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async indexPost(post: IPost) {
    try {
      return await this.elasticsearchService.index({ index: this.index, body: { post } });
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException();
    }
  }
}
