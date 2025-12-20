import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GrammarSectionEntity, GrammarTopic } from './entities/grammar-topic.entity';

@Injectable()
export class GrammarTopicService {
  constructor(
    @InjectRepository(GrammarSectionEntity)
    private readonly sectionRepo: Repository<GrammarSectionEntity>,
    @InjectRepository(GrammarTopic)
    private readonly topicRepo: Repository<GrammarTopic>,
  ) {}

  async findAllSections(): Promise<GrammarSectionEntity[]> {
    return this.sectionRepo.find({
      order: { order: 'ASC' },
      relations: ['topics'],
    });
  }

  async findSectionById(id: string): Promise<GrammarSectionEntity | null> {
    return this.sectionRepo.findOne({
      where: { id },
      relations: ['topics'],
    });
  }

  async findAllTopics(sectionId?: string, parentTopicId?: string | null): Promise<GrammarTopic[]> {
    const where: any = {};
    if (sectionId) {
      where.sectionId = sectionId;
    }
    if (parentTopicId !== undefined) {
      where.parentTopicId = parentTopicId;
    }

    return this.topicRepo.find({
      where,
      order: { order: 'ASC', level: 'ASC' },
      relations: ['subtopics', 'section'],
    });
  }

  async findTopicById(id: string): Promise<GrammarTopic | null> {
    return this.topicRepo.findOne({
      where: { id },
      relations: ['subtopics', 'parentTopic', 'section'],
    });
  }

  async findTopicTree(topicId: string): Promise<GrammarTopic | null> {
    return this.findTopicById(topicId);
  }

  async createSection(data: {
    name: string;
    title: string;
    description?: string;
    order?: number;
  }): Promise<GrammarSectionEntity> {
    const section = this.sectionRepo.create(data);
    return this.sectionRepo.save(section);
  }

  async createTopic(data: {
    sectionId: string;
    parentTopicId?: string | null;
    title: string;
    description?: string;
    level?: number;
    order?: number;
  }): Promise<GrammarTopic> {
    const topic = this.topicRepo.create({
      ...data,
      level: data.level ?? (data.parentTopicId ? 1 : 0),
    });
    return this.topicRepo.save(topic);
  }
}
