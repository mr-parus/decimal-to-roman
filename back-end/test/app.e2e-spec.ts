import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { configureApp } from '../src/math/utils/configs.util';
import {
  MAX_ROMAN_IN_DECIMAL,
  MIN_ROMAN_IN_DECIMAL,
} from '../src/math/constatns';
import { MathModule } from '../src/math/math.module';

describe('MathController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MathModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    configureApp(app);

    await app.init();
  });

  describe('/api/math/decimal-to-roman (POST)', () => {
    const TEST_URL = '/api/math/decimal-to-roman';

    it('should respond with 400 when `decimal` is missing', () => {
      const payload = {};

      return request(app.getHttpServer())
        .post(TEST_URL)
        .send(payload)
        .expect(400)
        .expect(({ body }) => {
          expect(body).toEqual({
            statusCode: 400,
            message: ['decimal should not be empty'],
            error: 'Bad Request',
          });
        });
    });

    it('should respond with 400 when `decimal` is below zero', () => {
      const payload = { decimal: -10 };

      return request(app.getHttpServer())
        .post(TEST_URL)
        .send(payload)
        .expect(400)
        .expect(({ body }) => {
          expect(body).toEqual({
            statusCode: 400,
            message: [`decimal must not be less than ${MIN_ROMAN_IN_DECIMAL}`],
            error: 'Bad Request',
          });
        });
    });

    it('should respond with 400 when `decimal` is equal to zero', () => {
      const payload = { decimal: 0 };

      return request(app.getHttpServer())
        .post(TEST_URL)
        .send(payload)
        .expect(400)
        .expect(({ body }) => {
          expect(body).toEqual({
            statusCode: 400,
            message: [`decimal must not be less than ${MIN_ROMAN_IN_DECIMAL}`],
            error: 'Bad Request',
          });
        });
    });

    it('should respond with 400 when `decimal` is equal to zero', () => {
      const payload = { decimal: 4000 };

      return request(app.getHttpServer())
        .post(TEST_URL)
        .send(payload)
        .expect(400)
        .expect(({ body }) => {
          expect(body).toEqual({
            statusCode: 400,
            message: [`decimal must not be less than ${MIN_ROMAN_IN_DECIMAL}`],
            error: 'Bad Request',
          });
        });
    });

    it('should respond with 400 when `decimal` is bigger then max', () => {
      const payload = { decimal: MAX_ROMAN_IN_DECIMAL + 1 };

      return request(app.getHttpServer())
        .post(TEST_URL)
        .send(payload)
        .expect(400)
        .expect(({ body }) => {
          expect(body).toEqual({
            statusCode: 400,
            message: [
              `decimal must not be greater than ${MAX_ROMAN_IN_DECIMAL}`,
            ],
            error: 'Bad Request',
          });
        });
    });

    it('should respond with 400 when `decimal` not a number', () => {
      const payload = { decimal: 'not a number' };

      return request(app.getHttpServer())
        .post(TEST_URL)
        .send(payload)
        .expect(400)
        .expect(({ body }) => {
          expect(body).toEqual({
            statusCode: 400,
            message: ['decimal must be an integer number'],
            error: 'Bad Request',
          });
        });
    });

    it('should respond with 400 when `decimal` is float', () => {
      const payload = { decimal: 5.5 };

      return request(app.getHttpServer())
        .post(TEST_URL)
        .send(payload)
        .expect(400)
        .expect(({ body }) => {
          expect(body).toEqual({
            statusCode: 400,
            message: ['decimal must be an integer number'],
            error: 'Bad Request',
          });
        });
    });
  });
});
