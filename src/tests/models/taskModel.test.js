const { create, list } = require('../../models/taskModel');
const firestore = require('../../utils/firestore');
const os = require('os');

jest.mock('../../utils/firestore', () => ({
  collection: jest.fn().mockReturnThis(),
  add: jest.fn(),
  get: jest.fn(),
}));

jest.mock('os', () => ({
  hostname: jest.fn(),
}));

describe('Task Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should add tasks with computer name and return them with ids', async () => {
      const mockComputerName = 'test-computer';
      os.hostname.mockReturnValue(mockComputerName);
  
      const mockDocRef = { id: '12345' };
      firestore.add.mockResolvedValueOnce(mockDocRef).mockResolvedValueOnce(mockDocRef);
  
      const tasks = [{ name: 'Task 1' }, { name: 'Task 2' }];
      const result = await create(tasks);
  
      expect(result).toEqual([
        { id: '12345', name: 'Task 1', computer: mockComputerName },
        { id: '12345', name: 'Task 2', computer: mockComputerName },
      ]);
  
      expect(firestore.add).toHaveBeenCalledTimes(2);
      expect(firestore.add).toHaveBeenCalledWith({ name: 'Task 1', computer: mockComputerName });
      expect(firestore.add).toHaveBeenCalledWith({ name: 'Task 2', computer: mockComputerName });
  
      expect(os.hostname).toHaveBeenCalled();
    });
  });

  describe('list', () => {
    it('should return all tasks from Firestore', async () => {
      const mockSnapshot = [
        { data: () => ({ name: 'Task 1', computer: 'test-computer' }) },
        { data: () => ({ name: 'Task 2', computer: 'test-computer' }) },
      ];
      firestore.get.mockResolvedValueOnce(mockSnapshot);

      const result = await list();

      expect(result).toEqual([
        { name: 'Task 1', computer: 'test-computer' },
        { name: 'Task 2', computer: 'test-computer' },
      ]);

      expect(firestore.get).toHaveBeenCalledTimes(1);
    });
  });
});