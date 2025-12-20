import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Constructor } from './entities/constructor.entity';
import { DrillGrid } from './entities/drill-grid.entity';
import { Flowchart } from './entities/flowchart.entity';
import { PatternCard } from './entities/pattern-card.entity';
import { GrammarSectionEntity, GrammarTopic } from './entities/grammar-topic.entity';
import { ConstructorsService } from './constructors.service';
import { DrillGridService } from './drill-grid.service';
import { FlowchartService } from './flowchart.service';
import { PatternCardService } from './pattern-card.service';
import { GrammarTopicService } from './grammar-topic.service';
import { ConstructorsController } from './constructors.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Constructor,
      DrillGrid,
      Flowchart,
      PatternCard,
      GrammarSectionEntity,
      GrammarTopic
    ])
  ],
  controllers: [ConstructorsController],
  providers: [
    ConstructorsService,
    DrillGridService,
    FlowchartService,
    PatternCardService,
    GrammarTopicService
  ],
  exports: [
    ConstructorsService,
    DrillGridService,
    FlowchartService,
    PatternCardService,
    GrammarTopicService
  ]
})
export class ConstructorsModule {}
