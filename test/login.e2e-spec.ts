import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '@/app.module';
import { TransformInterceptor } from '@/common/interceptors/response.interceptor';
import { AllExceptionFilter } from '@/common/filters/all-exception.filter';

describe('AuthController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true
      })
    );
    app.useGlobalInterceptors(new TransformInterceptor());
    app.useGlobalFilters(new AllExceptionFilter());
    await app.init();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  it('TC_LOGIN_0001', async () => {
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

  it('TC_LOGIN_0002', async () => {
    return await request(app.getHttpServer())
      .post('/auth/login')
      .send({ password: '12345678' })
      .expect(401);
  });

  it('TC_LOGIN_0003', async () => {
    return await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: null, password: '12345678' })
      .expect(401);
  });

  it('TC_LOGIN_0004', async () => {
    return await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: '', password: '12345678' })
      .expect(401);
  });

  it('TC_LOGIN_0005', async () => {
    return await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'test', password: '12345678' })
      .expect(400);
  });

  it('TC_LOGIN_0006', async () => {
    return await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'user@gmail.com' })
      .expect(401);
  });

  it('TC_LOGIN_0007', async () => {
    return await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'user@gmail.com', password: null })
      .expect(401);
  });

  it('TC_LOGIN_0008', async () => {
    return await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'user@gmail.com', password: '' })
      .expect(401);
  });

  it('TC_LOGIN_0009', async () => {
    return await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'user@gmail.com', password: '1234567' })
      .expect(400);
  });

  it('TC_LOGIN_0010', async () => {
    return await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'user-error@gmail.com', password: '12345678' })
      .expect(401);
  });

  it('TC_LOGIN_0011', async () => {
    return await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'user@gmail.com', password: '123456789' })
      .expect(401);
  });

  afterAll(async () => {
    await app.close();
  });
});
