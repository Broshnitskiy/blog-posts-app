import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { defaultPosts } from './mockData';

@Injectable()
export class PostService {
  private posts: Post[] = defaultPosts;
  private idCounter = 3;

  findAll(): Post[] {
    return this.posts;
  }

  findOne(id: number): Post {
    const post = this.posts.find((p) => p.id === id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  create(createPostDto: CreatePostDto): Post {
    const newPost = {
      id: this.idCounter++,
      createdAt: new Date(),
      ...createPostDto,
    } as Post;

    this.posts.push(newPost);
    return newPost;
  }

  update(id: number, updatePostDto: UpdatePostDto): Post {
    const post = this.findOne(id);
    Object.assign(post, updatePostDto);
    return post;
  }

  remove(id: number): { id: number } {
    const index = this.posts.findIndex((p) => p.id === id);

    if (index === -1) {
      throw new NotFoundException('Post not found');
    }

    this.posts.splice(index, 1);

    return { id };
  }
}
