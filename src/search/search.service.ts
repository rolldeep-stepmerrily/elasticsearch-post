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

  async updatePost(post: IPost) {
    try {
      return this.elasticsearchService.update({
        index: this.index,
        id: post.id.toString(),
        body: { doc: { post } },
      });
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException();
    }
  }

  async deletePost(postId: number) {
    try {
      const searchResult = await this.elasticsearchService.search({
        index: this.index,
        body: { query: { match: { 'post.id': postId.toString() } } },
      });

      const hitId = searchResult.hits.hits[0]?._id;

      if (!hitId) {
        return;
      }

      await this.elasticsearchService.delete({ index: this.index, id: hitId });
    } catch (e) {
      console.error(e);
      if (e.meta.statusCode !== 404) {
        console.error(e);

        throw new InternalServerErrorException();
      }
    }
  }

  async search(query: string) {
    const { hits } = await this.elasticsearchService.search({
      index: this.index,
      body: { query: { multi_match: { query } } },
    });

    const posts = hits.hits.map((hit: any) => {
      console.log(hit);
      const { _source } = hit;

      return {
        id: _source.post.id,
        hitId: hit._id,
        title: _source.post.title,
        content: _source.post.content,
        tags: _source.post.tags,
      };
    });

    return { posts };
  }
}
