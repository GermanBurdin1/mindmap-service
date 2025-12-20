// data-source.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { MindmapNode } from './mindmap/entities/node.entity';
import { Mindmap } from './mindmap/entities/mindmap.entity';
import { Constructor } from './constructors/entities/constructor.entity';
import { DrillGrid } from './constructors/entities/drill-grid.entity';
import { Flowchart } from './constructors/entities/flowchart.entity';
import { PatternCard } from './constructors/entities/pattern-card.entity';
import { GrammarSectionEntity, GrammarTopic } from './constructors/entities/grammar-topic.entity';
import * as dotenv from 'dotenv';

dotenv.config(); // загружаем .env

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgre',
  database: 'mindmap_db',
  entities: [
    Mindmap, 
    MindmapNode,
    Constructor,
    DrillGrid,
    Flowchart,
    PatternCard,
    GrammarSectionEntity,
    GrammarTopic
  ],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});

