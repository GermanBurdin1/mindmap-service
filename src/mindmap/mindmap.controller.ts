import { Controller, Get, Post, Body, Param, Delete, Patch, Req, NotFoundException } from '@nestjs/common';
import { MindmapService } from './mindmap.service';
import { CreateNodeDto } from './dto/create-node.dto';
import { CreateMindMapDto } from './dto/create-mindmap.dto';

@Controller('mindmap')
export class MindmapController {
  constructor(private readonly mindmapService: MindmapService) {}

  // 1) Создать mindmap
  @Post()
  createMindMap(@Body() dto: CreateMindMapDto, @Req() req: any) {
    const userId = req.user?.sub;
    return this.mindmapService.createMindMap(dto, userId);
  }

  // 2) Создать node (отдельный путь!)
  @Post('nodes')
  createNode(@Body() dto: CreateNodeDto, @Req() req: any) {
    const userId = req.user?.sub;
    return this.mindmapService.createNode(dto, userId);
  }

  // 3) Получить все mindmaps (если нужно)
  @Get()
  findAllMindmaps(@Req() req: any) {
    const userId = req.user?.sub;
    return this.mindmapService.findAllMindmaps(userId);
  }

  // 5) ✅ Новый endpoint: получить узлы по mindmapId
  @Get(':id/nodes')
  findNodes(@Param('id') mindmapId: string, @Req() req: any) {
    const userId = req.user?.sub;
    return this.mindmapService.findNodesByMindmapId(mindmapId, userId);
  }

  // Специфичные роуты должны быть перед параметризованными
  @Post('bulk-save')
  bulkSave(@Body() body: { nodes: Partial<CreateNodeDto>[] }, @Req() req: any) {
    const userId = req.user?.sub;
    return this.mindmapService.bulkSave(body.nodes, userId);
  }

  @Post('save-positions')
  savePositions(@Body() body: { nodes: { id: string; x: number; y: number }[] }, @Req() req: any) {
    const userId = req.user?.sub;
    return this.mindmapService.savePositions(body.nodes, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    // Валидация UUID: проверяем, что id является валидным UUID
    // Это предотвращает перехват запросов типа /mindmap/constructors
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      // Если это не UUID, значит это может быть другой путь (например, /mindmap/constructors)
      // Возвращаем 404, чтобы NestJS мог попробовать другие роуты
      throw new NotFoundException(`Invalid UUID format: ${id}. This route only accepts UUIDs.`);
    }
    const userId = req.user?.sub;
    return this.mindmapService.findOne(id, userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: any, @Req() req: any) {
    const userId = req.user?.sub;
    if ('type' in dto && 'content' in dto) {
      return this.mindmapService.updateContent(id, dto, userId);
    }
    if ('title' in dto) {
      return this.mindmapService.updateTitle(id, dto.title, userId);
    }
    if ('expanded' in dto) {
      return this.mindmapService.updateExpanded(id, dto.expanded, userId);
    }
    return { message: 'Неверный формат запроса' };
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    const userId = req.user?.sub;
    return this.mindmapService.delete(id, userId);
  }

}
