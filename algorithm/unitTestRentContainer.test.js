const rentContainers = require('./rentContainerAlgorithm');

describe('Rent Container Tests', () => {
  describe('Normal cases', () => {
    it('should rent containers with minimum cost when enough containers are available', () => {
      const result = rentContainers(3, [
        { name: 'Container renter A', container: 1, totalCost: 1 },
        { name: 'Container renter B', container: 2, totalCost: 1 },
        { name: 'Container renter C', container: 3, totalCost: 3 },
      ]);
      expect(result).toEqual([
        '[Contract with] Container renter B 2 container, price: 1',
        '[Contract with] Container renter A 1 container, price: 1',
        '[Summary] total cost 2',
      ]);
    });

    it('should handle not enough containers scenario', () => {
      const result = rentContainers(10, [
        { name: 'Container renter A', container: 5, totalCost: 5 },
        { name: 'Container renter B', container: 2, totalCost: 10 },
        { name: 'Container renter C', container: 2, totalCost: 3 },
      ]);
      expect(result).toEqual([
        '[Contract with] Container renter A 5 container, price: 5',
        '[Contract with] Container renter C 2 container, price: 3',
        '[Contract with] Container renter B 2 container, price: 10',
        'Not enough containers',
        '[Summary] total cost 18',
      ]);
    });

    it('test sort price ascending and not enough needed containers', () => {
      const result = rentContainers(10, [
        { name: 'Container renter A', container: 1, totalCost: 10 },
        { name: 'Container renter B', container: 1, totalCost: 11 },
        { name: 'Container renter C', container: 1, totalCost: 21 },
        { name: 'Container renter D', container: 1, totalCost: 2 },
        { name: 'Container renter E', container: 1, totalCost: 1 },
        { name: 'Container renter F', container: 1, totalCost: 12 },
      ]);
      expect(result).toEqual([
        '[Contract with] Container renter E 1 container, price: 1',
        '[Contract with] Container renter D 1 container, price: 2',
        '[Contract with] Container renter A 1 container, price: 10',
        '[Contract with] Container renter B 1 container, price: 11',
        '[Contract with] Container renter F 1 container, price: 12',
        '[Contract with] Container renter C 1 container, price: 21',
        'Not enough containers',
        '[Summary] total cost 57',
      ]);
    });

    it('test sort price ascending and enough needed containers', () => {
      const result = rentContainers(10, [
        { name: 'Container renter A', container: 1, totalCost: 10 },
        { name: 'Container renter B', container: 1, totalCost: 11 },
        { name: 'Container renter C', container: 3, totalCost: 21 },
        { name: 'Container renter D', container: 3, totalCost: 2 },
        { name: 'Container renter E', container: 3, totalCost: 1 },
        { name: 'Container renter F', container: 2, totalCost: 21 },
      ]);
      expect(result).toEqual([
        '[Contract with] Container renter E 3 container, price: 1',
        '[Contract with] Container renter D 3 container, price: 2',
        '[Contract with] Container renter C 3 container, price: 21',
        '[Contract with] Container renter A 1 container, price: 10',
        '[Summary] total cost 34',
      ]);
    });
  });

  describe('special cases', () => {
    it('should reject when needed containers is zero', () => {
      const result = rentContainers(0, [
        { name: 'Container renter A', container: 5, totalCost: 5 },
      ]);
      expect(result).toEqual(
        'Number of containers needed must be greater than 0',
      );
    });

    it('should reject when needed containers is negative', () => {
      const result = rentContainers(-1, [
        { name: 'Container renter A', container: 5, totalCost: 5 },
      ]);
      expect(result).toEqual(
        'Number of containers needed must be greater than 0',
      );
    });

    it('should handle empty listings', () => {
      const result = rentContainers(10, []);
      expect(result).toEqual('No listings found');
    });
  });
});
