import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MindmapNode } from './entities/node.entity';
import { Mindmap } from './entities/mindmap.entity';
import { MindmapService } from './mindmap.service';
import { MindmapController } from './mindmap.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Mindmap, MindmapNode])],
  providers: [MindmapService],
  controllers: [MindmapController],
})
export class MindmapModule {}
