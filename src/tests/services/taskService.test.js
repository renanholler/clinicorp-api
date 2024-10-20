const taskService = require('../../services/taskService');
const taskModel = require('../../models/taskModel');

jest.mock('../../models/taskModel');

describe('Task Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('insertTasks', () => {
    it('deve inserir múltiplas tarefas com sucesso', async () => {
      const tasks = [
        { description: 'Criar Login', responsable: 'Bruno', status: 'done' },
        { description: 'Criar Menu', responsable: 'Bruno', status: 'doing' }
      ];
      
      const insertedTasks = [
        { id: '1', description: 'Criar Login', responsable: 'Bruno', status: 'done', computer: 'localhost' },
        { id: '2', description: 'Criar Menu', responsable: 'Bruno', status: 'doing', computer: 'localhost' }
      ];

      taskModel.create.mockResolvedValue(insertedTasks);

      const result = await taskService.create(tasks);

      expect(taskModel.create).toHaveBeenCalledWith(tasks);
      expect(result).toEqual(insertedTasks);
    });

    it('deve lançar erro se o model falhar', async () => {
      const tasks = [
        { description: 'Criar Login', responsable: 'Bruno', status: 'done' }
      ];

      const errorMessage = 'Erro ao inserir tarefas';
      taskModel.create.mockRejectedValue(new Error(errorMessage));

      await expect(taskService.create(tasks)).rejects.toThrow(errorMessage);
      expect(taskModel.create).toHaveBeenCalledWith(tasks);
    });
  });

  describe('getTasks', () => {
    it('deve retornar todas as tarefas com sucesso', async () => {
      const tasks = [
        { id: '1', description: 'Criar Login', responsable: 'Bruno', status: 'done', computer: 'localhost' },
        { id: '2', description: 'Criar Menu', responsable: 'Bruno', status: 'doing', computer: 'localhost' }
      ];

      taskModel.list.mockResolvedValue(tasks);

      const result = await taskService.list();

      expect(taskModel.list).toHaveBeenCalled();
      expect(result).toEqual(tasks);
    });

    it('deve lançar erro se o model falhar', async () => {
      const errorMessage = 'Erro ao obter tarefas';
      taskModel.list.mockRejectedValue(new Error(errorMessage));

      await expect(taskService.list()).rejects.toThrow(errorMessage);
      expect(taskModel.list).toHaveBeenCalled();
    });
  });
});