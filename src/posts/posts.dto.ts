import { PickType } from '@nestjs/swagger';

import { Post } from './entities';

export class CreatePostDto extends PickType(Post, ['title', 'content', 'tags'] as const) {}

export class UpdatePostDto extends PickType(Post, ['title', 'content', 'tags'] as const) {}
