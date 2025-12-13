import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Constructor, ConstructorType } from './entities/constructor.entity';
import { CreateConstructorDto } from './dto/create-constructor.dto';
import { UpdateConstructorDto } from './dto/update-constructor.dto';

@Injectable()
export class ConstructorsService {
  constructor(
    @InjectRepository(Constructor)
    private readonly constructorRepo: Repository<Constructor>,
  ) {}

  async create(dto: CreateConstructorDto, userId: string): Promise<Constructor> {
    const constructor = this.constructorRepo.create({
      ...dto,
      userId,
    });
    const saved = await this.constructorRepo.save(constructor);
    // Убеждаемся, что ID присутствует
    if (!saved.id) {
      throw new Error('Constructor saved but ID is missing');
    }
    return saved;
  }

  async findAll(userId: string, type?: ConstructorType): Promise<Constructor[]> {
    const where: any = { userId };
    if (type) {
      where.type = type;
    }
    return this.constructorRepo.find({ where, order: { createdAt: 'DESC' } });
  }

  async findOne(id: string, userId: string): Promise<Constructor | null> {
    return this.constructorRepo.findOne({ where: { id, userId } });
  }

  async update(id: string, dto: UpdateConstructorDto, userId: string): Promise<Constructor | null> {
    const constructor = await this.constructorRepo.findOne({ where: { id, userId } });
    if (!constructor) {
      return null;
    }

    Object.assign(constructor, dto);
    return this.constructorRepo.save(constructor);
  }

  async delete(id: string, userId: string): Promise<boolean> {
    const result = await this.constructorRepo.delete({ id, userId });
    return (result.affected ?? 0) > 0;
  }

  async findByCourse(courseId: number, userId: string): Promise<Constructor[]> {
    return this.constructorRepo.find({
      where: { courseId, userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findByCourseLesson(courseLessonId: string, userId: string): Promise<Constructor[]> {
    return this.constructorRepo.find({
      where: { courseLessonId, userId },
      order: { createdAt: 'DESC' },
    });
  }
}

