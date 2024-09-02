import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { IPost } from 'src/posts/posts.interface';

@Injectable()
export class SearchService {
  private readonly index = 'posts';

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async indexPost(post: IPost) {
    try {
      const index = await this.elasticsearchService.index({ index: this.index, body: { post } });

      return index;
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException();
    }
  }

  async search(query: string) {
    const { hits } = await this.elasticsearchService.search({
      index: this.index,
      body: { query: { multi_match: { query } } },
    });

    return hits.hits.map((hit: any) => {
      const { _source } = hit;

      return {
        id: _source.post.id,
        hitId: hit._id,
        title: _source.post.title,
        content: _source.post.content,
        tags: _source.post.tags,
      };
    });
  }
}
