import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '@/app.module';

describe('AuthController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  it('IT-LOGIN-01', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'user@gmail.com', password: '12345678' })
      .expect(201);

    expect(response.body).toEqual(
      expect.objectContaining({
        message: 'Login successfully',
        data: expect.objectContaining({
          token: expect.any(String)
        })
      })
    );
  });

  it('IT-LOGIN-02', async () => {
    return await request(app.getHttpServer())
      .post('/auth/login')
      .send({ password: '12345678' })
      .expect(401);
  });

  it('IT-LOGIN-03', async () => {
    return await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: null, password: '12345678' })
      .expect(401);
  });

  it('IT-LOGIN-04', async () => {
    return await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: '', password: '12345678' })
      .expect(401);
  });

  it('IT-LOGIN-05', async () => {
    return await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'test', password: '12345678' })
      .expect(400);
  });

  it('IT-LOGIN-06', async () => {
    return await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'user@gmail.com' })
      .expect(401);
  });

  it('IT-LOGIN-07', async () => {
    return await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'user@gmail.com', password: null })
      .expect(401);
  });

  it('IT-LOGIN-08', async () => {
    return await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'user@gmail.com', password: '' })
      .expect(401);
  });

  it('IT-LOGIN-09', async () => {
    return await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'user@gmail.com', password: '1234567' })
      .expect(400);
  });

  it('IT-LOGIN-10', async () => {
    return await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'user-error@gmail.com', password: '12345678' })
      .expect(401);
  });

  it('IT-LOGIN-11', async () => {
    return await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'user@gmail.com', password: '123456789' })
      .expect(401);
  });

  afterAll(async () => {
    await app.close();
  });
});
