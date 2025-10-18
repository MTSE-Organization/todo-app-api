import { Test, TestingModule } from '@nestjs/testing';
import {
  INestApplication,
  ValidationPipe,
  NotFoundException,
  InternalServerErrorException
} from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '@/app.module';
import { TransformInterceptor } from '@/common/interceptors/response.interceptor';
import { AllExceptionFilter } from '@/common/filters/all-exception.filter';
import { TodosService } from '@/modules/todos/todos.service';

describe('TodosController - GET /todos/get/:id (login to get token)', () => {
  let app: INestApplication;
  let todosService: TodosService;

  let tokenUser: string;

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

    todosService = app.get(TodosService);

    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'admin@example.com', password: 'admin123654' })
      .expect(201);

    tokenUser = loginRes.body?.data?.token as string;
    expect(typeof tokenUser).toBe('string');
    expect(tokenUser.length).toBeGreaterThan(0);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  it('TC_TODO_GET_0001', async () => {
    jest.spyOn(todosService, 'findByIdAndAccount').mockResolvedValueOnce({
      id: 1,
      title: 'Buy Milk',
      description: 'Get from store',
      dueDate: '2030-01-01T00:00:00.000Z',
      status: 1,
      createdDate: '2029-12-01T05:00:00.000Z',
      modifiedDate: '2029-12-02T05:00:00.000Z',
      accountId: 1
    } as any);

    const res = await request(app.getHttpServer())
      .get('/todos/get/1')
      .set('Authorization', `Bearer ${tokenUser}`)
      .expect(200);

    expect(res.body).toEqual(
      expect.objectContaining({
        result: true,
        message: expect.any(String),
        data: expect.objectContaining({
          id: 1,
          title: 'Buy Milk',
          description: 'Get from store',
          dueDate: '2030-01-01T00:00:00.000Z',
          status: 1,
          createdDate: '2029-12-01T05:00:00.000Z',
          modifiedDate: '2029-12-02T05:00:00.000Z'
        })
      })
    );
  });

  it('TC_TODO_GET_0002', async () => {
    const res = await request(app.getHttpServer())
      .get('/todos/get/1')
      .expect(401);

    expect(res.body).toEqual(
      expect.objectContaining({
        result: false,
        message: 'Unauthorized',
        code: expect.stringMatching(/^ERROR-/)
      })
    );
  });

  it('TC_TODO_GET_0003', async () => {
    const res = await request(app.getHttpServer())
      .get('/todos/get/1')
      .set('Authorization', 'Bearer invalid.token')
      .expect(401);

    expect(res.body).toEqual(
      expect.objectContaining({
        result: false,
        message: expect.stringMatching(/Unauthorized|Invalid token/i),
        code: expect.stringMatching(/^ERROR-/)
      })
    );
  });

  it('TC_TODO_GET_0004', async () => {
    jest
      .spyOn(todosService, 'findByIdAndAccount')
      .mockImplementationOnce(async () => {
        throw new NotFoundException(
          'Todo not found or not owned by this account'
        );
      });

    const res = await request(app.getHttpServer())
      .get('/todos/get/99')
      .set('Authorization', `Bearer ${tokenUser}`)
      .expect(404);

    expect(res.body).toEqual(
      expect.objectContaining({
        message: 'Todo not found or not owned by this account'
      })
    );
  });

  it('TC_TODO_GET_0005', async () => {
    jest
      .spyOn(todosService, 'findByIdAndAccount')
      .mockImplementationOnce(async () => {
        throw new NotFoundException(
          'Todo not found or not owned by this account'
        );
      });

    const res = await request(app.getHttpServer())
      .get('/todos/get/999999')
      .set('Authorization', `Bearer ${tokenUser}`)
      .expect(404);

    expect(res.body).toEqual(
      expect.objectContaining({
        message: 'Todo not found or not owned by this account'
      })
    );
  });
});
