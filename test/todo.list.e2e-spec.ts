import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '@/app.module';
import { TransformInterceptor } from '@/common/interceptors/response.interceptor';
import { AllExceptionFilter } from '@/common/filters/all-exception.filter';
import { TodosService } from '@/modules/todos/todos.service';

describe('TodosController - GET /todos/list (login to get token)', () => {
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

  it('TC_TODO_LIST_0001', async () => {
    jest
      .spyOn(todosService, 'findAll')
      .mockResolvedValueOnce({ todos: rowsSample as any, count: 18 });

    const res = await request(app.getHttpServer())
      .get('/todos/list')
      .set('Authorization', `Bearer ${tokenUser}`)
      .expect(200);

    expect(res.body).toEqual(
      expect.objectContaining({
        result: true,
        data: expect.objectContaining({
          content: expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              title: expect.any(String),
              description: expect.any(String),
              dueDate: expect.any(String),
              status: expect.any(Number),
              createdDate: expect.any(String),
              modifiedDate: expect.any(String)
            })
          ]),
          totalElements: expect.any(Number),
          totalPages: expect.any(Number)
        })
      })
    );
  });

  it('TC_TODO_LIST_0002', async () => {
    jest
      .spyOn(todosService, 'findAll')
      .mockResolvedValueOnce({
        todos: rowsSample.slice(0, 2) as any,
        count: 6
      });

    const res = await request(app.getHttpServer())
      .get('/todos/list')
      .query({ size: 5 })
      .set('Authorization', `Bearer ${tokenUser}`)
      .expect(200);

    const data = res.body?.data;
    expect(data).toEqual(
      expect.objectContaining({
        content: expect.any(Array),
        totalElements: 6,
        totalPages: Math.ceil(6 / 5)
      })
    );
    expect(data.content.length).toBeLessThanOrEqual(5);
  });

  it('TC_TODO_LIST_0003', async () => {
    jest
      .spyOn(todosService, 'findAll')
      .mockResolvedValueOnce({ todos: [] as any, count: 10 });

    const res = await request(app.getHttpServer())
      .get('/todos/list')
      .query({ page: 6, size: 2 })
      .set('Authorization', `Bearer ${tokenUser}`)
      .expect(200);

    expect(res.body?.data).toEqual(
      expect.objectContaining({
        content: [],
        totalElements: 10,
        totalPages: Math.ceil(10 / 2)
      })
    );
  });

  it('TC_TODO_LIST_0004', async () => {
    const filtered = rowsSample.map((r) => ({
      ...r,
      title: r.title.toLowerCase()
    }));
    jest
      .spyOn(todosService, 'findAll')
      .mockResolvedValueOnce({
        todos: filtered as any,
        count: filtered.length
      });

    const res = await request(app.getHttpServer())
      .get('/todos/list')
      .query({ title: 'milk' })
      .set('Authorization', `Bearer ${tokenUser}`)
      .expect(200);

    const content = res.body?.data?.content as any[];
    expect(Array.isArray(content)).toBe(true);
    for (const item of content) {
      expect(item.title.toLowerCase()).toEqual(expect.stringContaining('milk'));
    }
  });

  it('TC_TODO_LIST_0005', async () => {
    const sample = [
      {
        id: 10,
        title: 'Buy Milk 10',
        description: 'Get from store',
        dueDate: '2030-01-10T00:00:00.000Z',
        status: 1,
        createdDate: '2029-11-30T05:00:00.000Z',
        modifiedDate: '2029-12-01T05:00:00.000Z'
      }
    ];
    jest
      .spyOn(todosService, 'findAll')
      .mockResolvedValueOnce({ todos: sample as any, count: 1 });

    const res = await request(app.getHttpServer())
      .get('/todos/list')
      .query({
        dueDateFrom: '2029-01-01T00:00:00Z',
        dueDateTo: '2030-12-31T23:59:59Z'
      })
      .set('Authorization', `Bearer ${tokenUser}`)
      .expect(200);

    const content: any[] = res.body?.data?.content ?? [];
    for (const item of content) {
      const d = new Date(item.dueDate).getTime();
      expect(d).toBeGreaterThanOrEqual(
        new Date('2029-01-01T00:00:00Z').getTime()
      );
      expect(d).toBeLessThanOrEqual(new Date('2030-12-31T23:59:59Z').getTime());
    }
  });

  it('TC_TODO_LIST_0006', async () => {
    const sample = [
      { ...rowsSample[0], dueDate: '2030-06-01T00:00:00.000Z' },
      { ...rowsSample[1], dueDate: '2030-07-01T00:00:00.000Z' }
    ];
    jest
      .spyOn(todosService, 'findAll')
      .mockResolvedValueOnce({ todos: sample as any, count: 2 });

    const res = await request(app.getHttpServer())
      .get('/todos/list')
      .query({ dueDateFrom: '2029-01-01T00:00:00Z' })
      .set('Authorization', `Bearer ${tokenUser}`)
      .expect(200);

    const content: any[] = res.body?.data?.content ?? [];
    for (const item of content) {
      const d = new Date(item.dueDate).getTime();
      expect(d).toBeGreaterThanOrEqual(
        new Date('2029-01-01T00:00:00Z').getTime()
      );
    }
  });

  it('TC_TODO_LIST_0007', async () => {
    const sample = [{ ...rowsSample[0], dueDate: '2029-06-01T00:00:00.000Z' }];
    jest
      .spyOn(todosService, 'findAll')
      .mockResolvedValueOnce({ todos: sample as any, count: 1 });

    const res = await request(app.getHttpServer())
      .get('/todos/list')
      .query({ dueDateTo: '2030-12-31T23:59:59Z' })
      .set('Authorization', `Bearer ${tokenUser}`)
      .expect(200);

    const content: any[] = res.body?.data?.content ?? [];
    for (const item of content) {
      const d = new Date(item.dueDate).getTime();
      expect(d).toBeLessThanOrEqual(new Date('2030-12-31T23:59:59Z').getTime());
    }
  });

  it('TC_TODO_LIST_0008', async () => {
    const spy = jest
      .spyOn(todosService, 'findAll')
      .mockResolvedValueOnce({ todos: rowsSample as any, count: 2 });

    await request(app.getHttpServer())
      .get('/todos/list')
      .set('Authorization', `Bearer ${tokenUser}`)
      .expect(200);

    expect(spy).toHaveBeenCalled();
  });

  it('TC_TODO_LIST_0009', async () => {
    jest
      .spyOn(todosService, 'findAll')
      .mockResolvedValueOnce({ todos: [] as any, count: 0 });

    const res = await request(app.getHttpServer())
      .get('/todos/list')
      .query({ title: 'Buy food' })
      .set('Authorization', `Bearer ${tokenUser}`)
      .expect(200);

    expect(res.body?.data).toEqual(
      expect.objectContaining({
        content: [],
        totalElements: 0,
        totalPages: 0
      })
    );
  });

  it('TC_TODO_LIST_0010', async () => {
    const sample = [
      {
        id: 1,
        title: 'A',
        description: '',
        dueDate: '2030-01-01T00:00:00.000Z',
        status: 1,
        createdDate: '2029-12-03T05:00:00.000Z',
        modifiedDate: '2029-12-03T06:00:00.000Z'
      },
      {
        id: 2,
        title: 'B',
        description: '',
        dueDate: '2030-01-01T00:00:00.000Z',
        status: 1,
        createdDate: '2029-12-01T05:00:00.000Z',
        modifiedDate: '2029-12-01T06:00:00.000Z'
      },
      {
        id: 3,
        title: 'C',
        description: '',
        dueDate: '2030-01-02T00:00:00.000Z',
        status: 1,
        createdDate: '2029-12-02T05:00:00.000Z',
        modifiedDate: '2029-12-02T06:00:00.000Z'
      }
    ];
    jest
      .spyOn(todosService, 'findAll')
      .mockResolvedValueOnce({
        todos: [sample[0], sample[2], sample[1]] as any,
        count: 3
      });

    const res = await request(app.getHttpServer())
      .get('/todos/list')
      .set('Authorization', `Bearer ${tokenUser}`)
      .expect(200);

    const ids = (res.body?.data?.content ?? []).map((x: any) => x.id);
    expect(ids).toEqual([1, 3, 2]);
  });

  it('TC_TODO_LIST_0011', async () => {
    const res = await request(app.getHttpServer())
      .get('/todos/list')
      .expect(401);

    expect(res.body).toEqual(
      expect.objectContaining({
        result: false,
        message: 'Unauthorized',
        code: expect.stringMatching(/^ERROR-/)
      })
    );
  });

  it('TC_TODO_LIST_0012', async () => {
    const res = await request(app.getHttpServer())
      .get('/todos/list')
      .query({ size: 'abc' })
      .set('Authorization', `Bearer ${tokenUser}`)
      .expect(400);

    expect(res.body).toEqual(
      expect.objectContaining({
        result: false,
        code: 'ERROR',
        message: 'Data not suitable',
        error: expect.arrayContaining([
          expect.stringMatching(/size.*must be a number/i)
        ])
      })
    );
  });

  it('TC_TODO_LIST_0013', async () => {
    const res = await request(app.getHttpServer())
      .get('/todos/list')
      .query({ dueDateFrom: 'not-a-date', dueDateTo: 'not-a-date' })
      .set('Authorization', `Bearer ${tokenUser}`)
      .expect(400);

    expect(res.body).toEqual(
      expect.objectContaining({
        result: false,
        code: 'ERROR',
        message: 'Data not suitable',
        error: expect.arrayContaining([
          expect.stringMatching(/dueDateFrom.*valid date/i),
          expect.stringMatching(/dueDateTo.*valid date/i)
        ])
      })
    );
  });
});
