import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Constructor } from './entities/constructor.entity';
import { DrillGrid } from './entities/drill-grid.entity';
import { Flowchart } from './entities/flowchart.entity';
import { PatternCard } from './entities/pattern-card.entity';
import { ConstructorsService } from './constructors.service';
import { DrillGridService } from './drill-grid.service';
import { FlowchartService } from './flowchart.service';
import { PatternCardService } from './pattern-card.service';
import { ConstructorsController } from './constructors.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Constructor,
      DrillGrid,
      Flowchart,
      PatternCard
    ])
  ],
  controllers: [ConstructorsController],
  providers: [
    ConstructorsService,
    DrillGridService,
    FlowchartService,
    PatternCardService
  ],
  exports: [
    ConstructorsService,
    DrillGridService,
    FlowchartService,
    PatternCardService
  ]
})
export class ConstructorsModule {}
