import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
import { defaultPosts } from './mockData';

describe('PostService', () => {
  let service: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostService],
    }).compile();

    service = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all posts', () => {
    expect(service.findAll()).toEqual(defaultPosts);
  });

  it('should return a post by id', () => {
    expect(service.findOne(1)).toEqual(defaultPosts[0]);
  });

  it('should throw an exception if post is not found', () => {
    expect(() => service.findOne(999)).toThrowError('Post not found');
  });

  it('should create a new post', () => {
    const createPostDto = {
      title: 'New Post',
      content: 'Content of new post',
      author: 'New Author',
    };
    const newPost = service.create(createPostDto);
    expect(newPost).toHaveProperty('id');
    expect(newPost.title).toBe(createPostDto.title);
  });

  it('should update a post', () => {
    const updatePostDto = { title: 'Updated Title' };
    const updatedPost = service.update(1, updatePostDto);
    expect(updatedPost.title).toBe(updatePostDto.title);
  });

  it('should throw an exception if post to update is not found', () => {
    expect(() => service.update(999, { title: 'Updated Title' })).toThrowError(
      'Post not found',
    );
  });

  it('should remove a post', () => {
    service.remove(1);
    expect(() => service.findOne(1)).toThrowError('Post not found');
  });

  it('should throw an exception if post to remove is not found', () => {
    expect(() => service.remove(999)).toThrowError('Post not found');
  });
});
