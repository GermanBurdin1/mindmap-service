import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flowchart } from './entities/flowchart.entity';
import { CreateFlowchartDto } from './dto/create-flowchart.dto';
import { ConstructorsService } from './constructors.service';

@Injectable()
export class FlowchartService {
  constructor(
    @InjectRepository(Flowchart)
    private readonly flowchartRepo: Repository<Flowchart>,
    private readonly constructorsService: ConstructorsService,
  ) {}

  async create(constructorId: string, dto: CreateFlowchartDto, userId: string): Promise<Flowchart | null> {
    const constructor = await this.constructorsService.findOne(constructorId, userId);
    if (!constructor || constructor.type !== 'flowchart') {
      return null;
    }

    const flowchart = this.flowchartRepo.create({
      id: constructorId,
      ...dto,
    });
    return this.flowchartRepo.save(flowchart);
  }

  async findOne(id: string, userId: string): Promise<Flowchart | null> {
    const constructor = await this.constructorsService.findOne(id, userId);
    if (!constructor) {
      return null;
    }

    return this.flowchartRepo.findOne({ where: { id }, relations: ['constructorRef'] });
  }

  async update(id: string, dto: Partial<CreateFlowchartDto>, userId: string): Promise<Flowchart | null> {
    const flowchart = await this.findOne(id, userId);
    if (!flowchart) {
      return null;
    }

    Object.assign(flowchart, dto);
    return this.flowchartRepo.save(flowchart);
  }

  async traverse(id: string, path: { nodeId: string; choice?: string }[], userId: string) {
    const flowchart = await this.findOne(id, userId);
    if (!flowchart) {
      return null;
    }

    const visitedNodes: string[] = [];
    const currentPath: any[] = [];
    let currentNodeId = flowchart.startNodeId;

    for (const step of path) {
      const node = flowchart.nodes.find((n) => n.id === step.nodeId);
      if (!node) {
        return { error: `Node ${step.nodeId} not found` };
      }

      visitedNodes.push(node.id);
      currentPath.push({
        nodeId: node.id,
        nodeType: node.type,
        label: node.label,
        choice: step.choice,
      });

      // Если это decision узел, находим следующий узел по выбору
      if (node.type === 'decision' && step.choice) {
        const edge = flowchart.edges.find(
          (e) => e.from === node.id && e.condition === step.choice,
        );
        if (edge) {
          currentNodeId = edge.to;
        } else {
          return { error: `Invalid choice ${step.choice} for node ${node.id}` };
        }
      } else if (node.type === 'action' || node.type === 'result') {
        // Для action и result узлов находим следующий узел
        const edge = flowchart.edges.find((e) => e.from === node.id);
        if (edge) {
          currentNodeId = edge.to;
        }
      }

      // Если достигли конечного узла
      if (node.type === 'end') {
        break;
      }
    }

    const currentNode = flowchart.nodes.find((n) => n.id === currentNodeId);
    return {
      path: currentPath,
      currentNode,
      visitedNodes,
      isComplete: currentNode?.type === 'end',
    };
  }

  async getResult(id: string, path: { nodeId: string; choice?: string }[], userId: string) {
    const traversal = await this.traverse(id, path, userId);
    if (!traversal || traversal.error || !traversal.path) {
      return traversal;
    }

    const resultNode = traversal.path.find((p) => p.nodeType === 'result');
    return {
      result: resultNode?.label,
      fullPath: traversal.path,
      explanation: resultNode?.explanation,
    };
  }
}

