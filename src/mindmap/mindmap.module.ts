import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MindmapNode } from './entities/node.entity';
import { MindmapService } from './mindmap.service';
import { MindmapController } from './mindmap.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MindmapNode])],
  providers: [MindmapService],
  controllers: [MindmapController],
})
export class MindmapModule {}
