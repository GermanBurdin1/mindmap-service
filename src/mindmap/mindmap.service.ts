import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MindmapNode } from './entities/node.entity';
import { CreateNodeDto } from './dto/create-node.dto';
import { UpdateContentDto } from './dto/update-content.dto';

@Injectable()
export class MindmapService {
  constructor(
    @InjectRepository(MindmapNode)
    private readonly nodeRepo: Repository<MindmapNode>,
  ) { }

  create(dto: CreateNodeDto, userId: string) {
    return this.nodeRepo.save({ ...dto, userId });
  }

  findAll(userId: string) {
    return this.nodeRepo.find({ where: { userId } });
  }

  findOne(id: string, userId: string) {
    return this.nodeRepo.findOneBy({ id, userId });
  }

  async updateContent(id: string, dto: UpdateContentDto, userId: string) {
    const node = await this.nodeRepo.findOneBy({ id, userId });
    if (!node) return null;

    if (['rule', 'exception', 'example', 'exercise'].includes(dto.type)) {
      (node as any)[dto.type] = dto.content;
    } else {
      throw new Error(`Invalid content type: ${dto.type}`);
    }

    return this.nodeRepo.save(node);
  }

  async updateTitle(id: string, title: string, userId: string) {
    const node = await this.nodeRepo.findOneBy({ id, userId });
    if (!node) return null;

    node.title = title;
    return this.nodeRepo.save(node);
  }

  async updateExpanded(id: string, expanded: boolean, userId: string) {
    const node = await this.nodeRepo.findOneBy({ id, userId });
    if (!node) return null;

    node.expanded = expanded;
    return this.nodeRepo.save(node);
  }

  async bulkSave(nodes: Partial<MindmapNode>[], userId: string) {
    const nodesWithUserId = nodes.map(node => ({ ...node, userId }));
    return this.nodeRepo.save(nodesWithUserId);
  }

  delete(id: string, userId: string) {
    return this.nodeRepo.delete({ id, userId });
  }

  async savePositions(positions: { id: string; x: number; y: number }[], userId: string) {
    for (const pos of positions) {
      await this.nodeRepo.update({ id: pos.id, userId }, {
        x: pos.x,
        y: pos.y
      });
    }
    return { message: 'Позиции обновлены' };
  }

}
