import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

import { SearchService } from './search.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SearchController } from './search.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        node: configService.getOrThrow<string>('ELASTICSEARCH_NODE'),
        auth: { apiKey: configService.getOrThrow<string>('ELASTICSEARCH_API_KEY') },
        tls: { rejectUnauthorized: false },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [SearchService],
  exports: [SearchService],
  controllers: [SearchController],
})
export class SearchModule {}
