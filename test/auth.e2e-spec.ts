import { Test, TestingModule } from '@nestjs/testing';
import {
  INestApplication,
  NotFoundException,
  ValidationPipe
} from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '@/app.module';
import { TransformInterceptor } from '@/common/interceptors/response.interceptor';
import { AllExceptionFilter } from '@/common/filters/all-exception.filter';
import { TodosService } from '@/modules/todos/todos.service';

describe('TodosController Auth & Basic APIs (login to get token)', () => {
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

  const rowsSample = [
    {
      id: 2,
      title: 'Buy Milk 2',
      description: 'Get from store',
      dueDate: '2030-01-02T00:00:00.000Z',
      status: 1,
      createdDate: '2029-12-02T05:00:00.000Z',
      modifiedDate: '2029-12-03T05:00:00.000Z'
    },
    {
      id: 3,
      title: 'Buy Milk 3',
      description: 'Get from store',
      dueDate: '2030-01-03T00:00:00.000Z',
      status: 1,
      createdDate: '2029-12-03T05:00:00.000Z',
      modifiedDate: '2029-12-04T05:00:00.000Z'
    }
  ];

  it('TC_AUTH_0001 - GET /todos/list', async () => {
    const spy = jest
      .spyOn(todosService, 'findAll')
      .mockResolvedValueOnce({ todos: rowsSample as any, count: 2 });

    await request(app.getHttpServer())
      .get('/todos/list')
      .set('Authorization', `Bearer ${tokenUser}`)
      .expect(200);

    expect(spy).toHaveBeenCalled();
  });

  it('TC_AUTH_0002 - Lấy todo theo ID thành công', async () => {
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
        path: '/todos/get/1',
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

  it('TC_AUTH_0003 - Todo không tồn tại', async () => {
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

  it('TC_AUTH_0004 - Update todo không tồn tại', async () => {
    jest.spyOn(todosService, 'update').mockImplementationOnce(async () => {
      throw new NotFoundException(
        'Todo not found or not owned by this account'
      );
    });

    const body = {
      id: 30,
      title: 'Buy Milk Update',
      description: 'Get from store - updated',
      dueDate: '2030-02-01T00:00:00Z'
    };

    const res = await request(app.getHttpServer())
      .put('/todos/update')
      .set('Authorization', `Bearer ${tokenUser}`)
      .send(body)
      .expect(404);

    expect(res.body).toEqual(
      expect.objectContaining({
        message: 'Todo not found or not owned by this account'
      })
    );
  });

  it('TC_AUTH_0005 - Delete todo không tồn tại', async () => {
    jest.spyOn(todosService, 'delete').mockImplementationOnce(async () => {
      throw new NotFoundException(
        'Todo not found or not owned by this account'
      );
    });

    const res = await request(app.getHttpServer())
      .delete('/todos/delete/99')
      .set('Authorization', `Bearer ${tokenUser}`)
      .expect(404);

    expect(res.body).toEqual(
      expect.objectContaining({
        message: 'Todo not found or not owned by this account'
      })
    );
  });
});
