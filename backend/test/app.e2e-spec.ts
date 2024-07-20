import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  // Example of testing your posts endpoint
  describe('Posts', () => {
    it('should return all posts on GET /post', async () => {
      const response = await request(app.getHttpServer()).get('/post');
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });

    it('should create a new post on POST /post', async () => {
      const newPost = {
        title: 'New Post',
        content: 'This is a new post.',
        author: 'Author',
      };

      const response = await request(app.getHttpServer())
        .post('/post')
        .send(newPost);
      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(newPost);
    });

    it('should return a single post on GET /post/:id', async () => {
      const postId = 1; // Ensure this ID exists in your test database or mock data
      const response = await request(app.getHttpServer()).get(
        `/post/${postId}`,
      );
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', postId);
    });

    it('should return 404 if post not found on GET /post/:id', async () => {
      const invalidPostId = 999;
      const response = await request(app.getHttpServer()).get(
        `/post/${invalidPostId}`,
      );
      expect(response.status).toBe(404);
    });

    it('should update a post on PUT /post/:id', async () => {
      const postId = 1; // Ensure this ID exists in your test database or mock data
      const updatedPost = {
        title: 'Updated Title',
      };

      const response = await request(app.getHttpServer())
        .put(`/post/${postId}`)
        .send(updatedPost);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(updatedPost);
    });

    it('should delete a post on DELETE /post/:id', async () => {
      const postId = 1;
      const response = await request(app.getHttpServer()).delete(
        `/post/${postId}`,
      );
      expect(response.status).toBe(200);
    });

    it('should return 404 if post to delete is not found on DELETE /post/:id', async () => {
      const invalidPostId = 999;
      const response = await request(app.getHttpServer()).delete(
        `/post/${invalidPostId}`,
      );
      expect(response.status).toBe(404);
    });
  });
});
