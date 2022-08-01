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

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/v1/words/top-10/in-titles-last (GET)', () => {
    return request(app.getHttpServer())
      .get('/v1/words/top-10/in-titles-last')
      .expect(200)
      .expect({
        data: [],
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
    return request(app.getHttpServer())
      .get('/v1/words/top-10/in-titles-last-600')
      .expect(200)
      .expect({
        data: [],
        message:
          'Top 10 most occurring words in titles of the last 600 stories of users with at least 10,000 karma',
      });
  });
});
