import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MindmapModule } from './mindmap/mindmap.module';
import { MindmapNode } from './mindmap/entities/node.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: +config.get<number>('DB_PORT')!,
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        entities: [MindmapNode],
        migrations: ['dist/migrations/*.js'], // ✅ используем JS при build
        synchronize: false, // ⚠️ выключено для миграций
      }),
    }),

    MindmapModule,
  ],
})
export class AppModule {}
