import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MindmapNode } from './entities/node.entity';
import { CreateNodeDto } from './dto/create-node.dto';
import { UpdateContentDto} from './dto/update-content.dto';

@Injectable()
export class MindmapService {
  constructor(
    @InjectRepository(MindmapNode)
    private readonly nodeRepo: Repository<MindmapNode>,
  ) {}

  create(dto: CreateNodeDto) {
    return this.nodeRepo.save(dto);
  }

  findAll() {
    return this.nodeRepo.find();
  }

  findOne(id: string) {
    return this.nodeRepo.findOneBy({ id });
  }

  async updateContent(id: string, dto: UpdateContentDto) {
    const node = await this.nodeRepo.findOneBy({ id });
    if (!node) return null;

    if (['rule', 'exception', 'example', 'exercise'].includes(dto.type)) {
      (node as any)[dto.type] = dto.content;
    } else {
      throw new Error(`Invalid content type: ${dto.type}`);
    }

    return this.nodeRepo.save(node);
  }

  async updateTitle(id: string, title: string) {
    const node = await this.nodeRepo.findOneBy({ id });
    if (!node) return null;

    node.title = title;
    return this.nodeRepo.save(node);
  }

  async updateExpanded(id: string, expanded: boolean) {
    const node = await this.nodeRepo.findOneBy({ id });
    if (!node) return null;

    node.expanded = expanded;
    return this.nodeRepo.save(node);
  }

  async bulkSave(nodes: Partial<MindmapNode>[]) {
    return this.nodeRepo.save(nodes);
  }

  delete(id: string) {
    return this.nodeRepo.delete(id);
  }

	async savePositions(positions: { id: string; x: number; y: number }[]) {
  for (const pos of positions) {
    await this.nodeRepo.update(pos.id, {
      x: pos.x,
      y: pos.y
    });
  }
  return { message: 'Позиции обновлены' };
}

}
