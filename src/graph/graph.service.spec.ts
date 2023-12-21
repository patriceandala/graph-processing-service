import { Test, TestingModule } from '@nestjs/testing';
import { GraphService } from './graph.service';
import { TransitionDto } from '../dto/transition.dto';

describe('GraphService', () => {
  let service: GraphService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GraphService],
    }).compile();

    service = module.get<GraphService>(GraphService);

    // Initialize the graph with test data
    service.addTransition(1, 2, { action: 'S', rule: 'A', type: 'S' });
    service.addTransition(2, 3, { action: 'S', rule: 'P', type: 'S' });
   });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the correct next status for a valid transition', () => {
    const transition: TransitionDto = { action: 'S', rule: 'A', type: 'S' };
    expect(service.getNextStatus(1, transition)).toBe(2);
  });

  it('should return null for an invalid transition', () => {
    const transition: TransitionDto = { action: 'S', rule: 'U', type: 'S' }; // An unlikely transition
    expect(service.getNextStatus(1, transition)).toBeNull();
  });




  it('should return the correct path for a valid bulk transition', () => {
    const transition: TransitionDto = { action: 'S', rule: 'A', type: 'S' };
    const statuses = [1, 2];
    expect(service.findPath(statuses, transition)).toEqual(statuses);
  });

  it('should return an empty array for an invalid bulk transition', () => {
    const transition: TransitionDto = { action: 'R', rule: 'U', type: 'S' }; // An unlikely transition
    const statuses = [1, 2];
    expect(service.findPath(statuses, transition)).toEqual([]);
  });

});
