// tests/controllers/taskController.test.js
const taskController = require('../../controllers/taskController');
const taskService = require('../../services/taskService');

jest.mock('../../services/taskService', () => ({
  create: jest.fn(),
  list: jest.fn()
}));

describe('Task Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.clearAllMocks(); // Limpar mocks antes de cada teste
  });

  describe('create', () => {
    it('deve criar múltiplas tarefas com sucesso', async () => {
      req.body = [
        { description: 'Criar Login', responsable: 'Bruno', status: 'done' },
        { description: 'Criar Menu', responsable: 'Bruno', status: 'doing' }
      ];

      const createdTasks = [
        { id: '1', description: 'Criar Login', responsable: 'Bruno', status: 'done', computer: 'localhost' },
        { id: '2', description: 'Criar Menu', responsable: 'Bruno', status: 'doing', computer: 'localhost' }
      ];

      taskService.create.mockResolvedValue(createdTasks);

      await taskController.create(req, res);

      expect(taskService.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(createdTasks);
    });

    it('deve retornar 500 se o service lançar erro', async () => {
      req.body = [
        { description: 'Criar Login', responsable: 'Bruno', status: 'done' }
      ];

      const errorMessage = 'Erro interno';
      taskService.create.mockRejectedValue(new Error(errorMessage));

      await taskController.create(req, res);

      expect(taskService.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe('list', () => {
    it('deve retornar todas as tarefas com sucesso', async () => {
      const tasks = [
        { id: '1', description: 'Criar Login', responsable: 'Bruno', status: 'done', computer: 'localhost' },
        { id: '2', description: 'Criar Menu', responsable: 'Bruno', status: 'doing', computer: 'localhost' }
      ];

      taskService.list.mockResolvedValue(tasks);

      await taskController.list(req, res);

      expect(taskService.list).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(tasks);
    });

    it('deve retornar 500 se o service lançar erro', async () => {
      const errorMessage = 'Erro interno';
      taskService.list.mockRejectedValue(new Error(errorMessage));

      await taskController.list(req, res);

      expect(taskService.list).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });
});