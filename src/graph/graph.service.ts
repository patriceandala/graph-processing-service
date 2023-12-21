import { Injectable } from '@nestjs/common';
import { TransitionDto } from '../dto/transition.dto';

@Injectable()
export class GraphService {
  private graph = new Map<number, Map<number, TransitionDto[]>>();

  constructor() {
    // Add transitions to the graph
    this.addTransition(1, 2, { action: 'S', rule: 'A', type: 'S' });
    this.addTransition(5, 2, { action: 'R', rule: 'P', type: 'S' });
    this.addTransition(2, 3, { action: 'S', rule: 'P', type: 'S' });
    this.addTransition(4, 2, { action: 'R', rule: 'P', type: 'S' });
    this.addTransition(3, 4, { action: 'R', rule: 'U', type: 'S' });
    this.addTransition(4, 5, { action: 'R', rule: 'A', type: 'S' });
    this.addTransition(4, 5, { action: 'R', rule: 'P', type: 'B' }); // Note: Multiple transitions for 4 -> 5
    this.addTransition(5, 1, { action: 'R', rule: 'A', type: 'S' });
  }

  addTransition(from: number, to: number, transition: TransitionDto) {
    if (!this.graph.has(from)) {
      this.graph.set(from, new Map());
    }
    const edges = this.graph.get(from);
    if (!edges.has(to)) {
      edges.set(to, []);
    }
    edges.get(to).push(transition);
  }

  getNextStatus(
    currentStatus: number,
    transition: TransitionDto,
  ): number | null {
    // Check if the current status exists in the graph
    if (!this.graph.has(currentStatus)) {
      return null;
    }

    const edges = this.graph.get(currentStatus);
    for (const [nextStatus, transitions] of edges) {
      // Check if any of the transitions match the given transition
      if (
        transitions.some(
          (t) =>
            t.action === transition.action &&
            t.rule === transition.rule &&
            t.type === transition.type,
        )
      ) {
        return nextStatus;
      }
    }

    // Return null if no matching transition is found
    return null;
  }

  findPath(statuses: number[], transition: TransitionDto): number[] {
    let path = [];

    for (let i = 0; i < statuses.length - 1; i++) {
      const currentStatus = statuses[i];
      const nextStatus = statuses[i + 1];

      if (this.isTransitionValid(currentStatus, nextStatus, transition)) {
        path.push(currentStatus);
      } else {
        return []; // Return an empty array if any transition is invalid
      }
    }

    // Add the last status to the path
    path.push(statuses[statuses.length - 1]);

    return path;
  }

  private isTransitionValid(
    from: number,
    to: number,
    transition: TransitionDto,
  ): boolean {
    if (!this.graph.has(from)) {
      return false;
    }

    const edges = this.graph.get(from);
    if (!edges.has(to)) {
      return false;
    }

    return edges
      .get(to)
      .some(
        (t) =>
          t.action === transition.action &&
          t.rule === transition.rule &&
          t.type === transition.type,
      );
  }
}
