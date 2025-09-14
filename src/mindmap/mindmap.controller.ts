import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { MindmapService } from './mindmap.service';
import { CreateNodeDto } from './dto/create-node.dto';

@Controller('mindmap')
export class MindmapController {
  constructor(private readonly mindmapService: MindmapService) {}

  @Post()
  create(@Body() dto: CreateNodeDto) {
    return this.mindmapService.create(dto);
  }

  @Post('bulk-save')
  bulkSave(@Body() body: { nodes: Partial<CreateNodeDto>[] }) {
    return this.mindmapService.bulkSave(body.nodes);
  }

  @Get()
  findAll() {
    return this.mindmapService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mindmapService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: any) {
    if ('type' in dto && 'content' in dto) {
      return this.mindmapService.updateContent(id, dto);
    }
    if ('title' in dto) {
      return this.mindmapService.updateTitle(id, dto.title);
    }
    if ('expanded' in dto) {
      return this.mindmapService.updateExpanded(id, dto.expanded);
    }
    return { message: 'Неверный формат запроса' };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mindmapService.delete(id);
  }

	@Post('save-positions')
savePositions(@Body() body: { nodes: { id: string; x: number; y: number }[] }) {
  return this.mindmapService.savePositions(body.nodes);
}

}
