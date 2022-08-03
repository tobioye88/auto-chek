import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { HackerNewsHelper } from '../src/helpers/hacker-news/hacker-news.helper';
import { AppModule } from './../src/app.module';
import { mockStories, mockTestUsers } from './test.stubs';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/v1/words/top-10/in-titles-last (GET)', () => {
    jest
      .spyOn(HackerNewsHelper, 'getLastStories')
      .mockResolvedValue(Promise.resolve(mockStories));

    return request(app.getHttpServer())
      .get('/v1/words/top-10/in-titles-last')
      .expect(200)
      .expect({
        data: [
          ['pytorch', 1],
          ['design', 1],
          ['philosophy', 1],
          ['2021', 1],
          ['taxes', 1],
          ['opensource', 1],
          ['edition', 1],
          ['you', 1],
          ['cant', 1],
          ['simply', 1],
        ],
        message:
          'Top 10 most occurring words in the titles of the last 25 stories',
      });
  });
  it('/v1/words/top-10/in-titles-last-week (GET)', () => {
    return request(app.getHttpServer())
      .get('/v1/words/top-10/in-titles-last-week')
      .expect(200)
      .expect({
        data: [],
        message:
          'Top 10 most occurring words in the titles of the post of exactly the last week',
      });
  });
  it('/v1/words/top-10/in-titles-last-600 (GET)', () => {
    jest
      .spyOn(HackerNewsHelper, 'getLastStories')
      .mockResolvedValue(Promise.resolve(mockStories));
    jest
      .spyOn(HackerNewsHelper, 'getUsersByIds')
      .mockResolvedValue(Promise.resolve(mockTestUsers));

    return request(app.getHttpServer())
      .get('/v1/words/top-10/in-titles-last-600')
      .expect(200)
      .expect({
        data: [
          ['pytorch', 1],
          ['design', 1],
          ['philosophy', 1],
        ],
        message:
          'Top 10 most occurring words in titles of the last 600 stories of users with at least 10,000 karma',
      });
  });
});
