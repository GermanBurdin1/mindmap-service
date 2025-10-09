import { Controller, Get, Post, Body, Param, Delete, Patch, Req } from '@nestjs/common';
import { MindmapService } from './mindmap.service';
import { CreateNodeDto } from './dto/create-node.dto';

@Controller('mindmap')
export class MindmapController {
  constructor(private readonly mindmapService: MindmapService) {}

  @Post()
  create(@Body() dto: CreateNodeDto, @Req() req: any) {
    const userId = req.user?.sub;
    return this.mindmapService.create(dto, userId);
  }

  @Post('bulk-save')
  bulkSave(@Body() body: { nodes: Partial<CreateNodeDto>[] }, @Req() req: any) {
    const userId = req.user?.sub;
    return this.mindmapService.bulkSave(body.nodes, userId);
  }

  @Get()
  findAll(@Req() req: any) {
    const userId = req.user?.sub;
    return this.mindmapService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
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

	@Post('save-positions')
savePositions(@Body() body: { nodes: { id: string; x: number; y: number }[] }, @Req() req: any) {
  const userId = req.user?.sub;
  return this.mindmapService.savePositions(body.nodes, userId);
}

}
