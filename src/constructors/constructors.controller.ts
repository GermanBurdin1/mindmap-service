import { Controller, Post, Get, Put, Delete, Body, Param, UseGuards, Request, Logger } from '@nestjs/common';
import { ConstructorsService } from './constructors.service';
import { DrillGridService } from './drill-grid.service';
import { FlowchartService } from './flowchart.service';
import { PatternCardService } from './pattern-card.service';
import { CreateConstructorDto } from './dto/create-constructor.dto';
import { CreateDrillGridDto } from './dto/create-drill-grid.dto';
import { CreateFlowchartDto } from './dto/create-flowchart.dto';
import { CreatePatternCardDto } from './dto/create-pattern-card.dto';
import { UpdateConstructorDto } from './dto/update-constructor.dto';

@Controller('mindmap/constructors')
export class ConstructorsController {
  private readonly logger = new Logger(ConstructorsController.name);

  constructor(
    private readonly constructorsService: ConstructorsService,
    private readonly drillGridService: DrillGridService,
    private readonly flowchartService: FlowchartService,
    private readonly patternCardService: PatternCardService,
  ) {}

  // Создать конструктор
  @Post()
  async create(@Body() dto: CreateConstructorDto, @Request() req: any) {
    // JWT стратегия возвращает payload в req.user, где userId находится в поле 'sub'
    const userId = req.user?.sub || req.user?.id || req.user?.userId;
    if (!userId) {
      this.logger.error('User ID not found in request. User object:', req.user);
      return { error: 'User ID not found' };
    }
    
    this.logger.log(`Creating constructor for user ${userId}:`, dto);
    
    try {
      const constructor = await this.constructorsService.create(dto, userId);
      this.logger.log(`Constructor created successfully with ID: ${constructor.id}`);
      return constructor;
    } catch (error) {
      this.logger.error('Error creating constructor:', error);
      throw error;
    }
  }

  // Получить все конструкторы пользователя
  @Get()
  async findAll(@Request() req: any) {
    this.logger.log(`[findAll] Request received: ${req.method} ${req.url}`);
    this.logger.log(`[findAll] Request path: ${req.path}`);
    this.logger.log(`[findAll] Request query: ${JSON.stringify(req.query)}`);
    
    const userId = req.user?.sub || req.user?.id || req.user?.userId;
    if (!userId) {
      this.logger.error('User ID not found in request');
      return { error: 'User ID not found' };
    }
    
    // Поддерживаем query параметры для фильтрации по типу
    const type = req.query?.type as string | undefined;
    
    this.logger.log(`Finding constructors for user ${userId}, type: ${type || 'all'}`);
    
    try {
      const constructors = await this.constructorsService.findAll(userId, type as any);
      this.logger.log(`Found ${constructors.length} constructors`);
      return constructors;
    } catch (error) {
      this.logger.error('Error finding constructors:', error);
      throw error;
    }
  }

  // Создать homework drill-grid из шаблона (должен быть перед @Get(':id'))
  @Post('drill-grid/:templateId/homework')
  async createHomeworkFromTemplate(
    @Param('templateId') templateId: string,
    @Body() body: { constructorId: string; studentUserId: string },
    @Request() req: any
  ) {
    const userId = req.user?.sub || req.user?.id || req.user?.userId;
    if (!userId) {
      return { error: 'User ID not found' };
    }
    return this.drillGridService.createHomeworkFromTemplate(
      templateId,
      body.studentUserId,
      body.constructorId
    );
  }

  // Получить конструктор по ID (должен быть после всех специфичных маршрутов)
  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req: any) {
    this.logger.log(`[findOne] Request received: ${req.method} ${req.url}`);
    this.logger.log(`[findOne] Request path: ${req.path}`);
    this.logger.log(`[findOne] ID parameter: ${id}`);
    this.logger.log(`[findOne] Request query: ${JSON.stringify(req.query)}`);
    
    const userId = req.user?.sub || req.user?.id || req.user?.userId;
    if (!userId) {
      return { error: 'User ID not found' };
    }
    
    // Валидация UUID: проверяем, что id является валидным UUID
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      this.logger.error(`Invalid UUID format: ${id}. This might indicate a routing issue.`);
      this.logger.error(`Request URL: ${req.url}, Path: ${req.path}, Query: ${JSON.stringify(req.query)}`);
      throw new Error(`Invalid UUID format: ${id}. Expected a valid UUID, got: ${id}`);
    }
    
    return this.constructorsService.findOne(id, userId);
  }

  // Обновить конструктор
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateConstructorDto,
    @Request() req: any
  ) {
    const userId = req.user?.sub || req.user?.id || req.user?.userId;
    if (!userId) {
      return { error: 'User ID not found' };
    }
    return this.constructorsService.update(id, dto, userId);
  }

  // Удалить конструктор
  @Delete(':id')
  async delete(@Param('id') id: string, @Request() req: any) {
    const userId = req.user?.sub || req.user?.id || req.user?.userId;
    if (!userId) {
      return { error: 'User ID not found' };
    }
    const result = await this.constructorsService.delete(id, userId);
    return { success: result };
  }

  // === DRILL-GRID ENDPOINTS ===

  // Получить все drill-grids текущего пользователя (info + homework для него)
  @Get('drill-grid/my')
  async getMyDrillGrids(@Request() req: any) {
    const userId = req.user?.sub || req.user?.id || req.user?.userId;
    if (!userId) {
      return { error: 'User ID not found' };
    }
    return this.drillGridService.findAllByUser(userId);
  }

  @Post(':id/drill-grid')
  async createDrillGrid(
    @Param('id') constructorId: string,
    @Body() dto: CreateDrillGridDto,
    @Request() req: any
  ) {
    const userId = req.user?.sub || req.user?.id || req.user?.userId;
    if (!userId) {
      this.logger.error('User ID not found in request for drill-grid creation');
      return { error: 'User ID not found' };
    }
    
    this.logger.log(`Creating drill-grid for constructor ${constructorId}, user ${userId}`);
    this.logger.log(`Drill-grid DTO:`, JSON.stringify(dto, null, 2));
    
    try {
      const result = await this.drillGridService.create(constructorId, dto, userId);
      if (!result) {
        this.logger.error(`Failed to create drill-grid for constructor ${constructorId}`);
        return { error: 'Failed to create drill-grid' };
      }
      this.logger.log(`Drill-grid created successfully with ID: ${result.id}`);
      return result;
    } catch (error) {
      this.logger.error('Error creating drill-grid:', error);
      throw error;
    }
  }

  @Get(':id/drill-grid')
  async getDrillGrid(@Param('id') id: string, @Request() req: any) {
    const userId = req.user?.sub || req.user?.id || req.user?.userId;
    if (!userId) {
      return { error: 'User ID not found' };
    }
    return this.drillGridService.findOne(id, userId);
  }

  @Put(':id/drill-grid')
  async updateDrillGrid(
    @Param('id') id: string,
    @Body() dto: Partial<CreateDrillGridDto>,
    @Request() req: any
  ) {
    const userId = req.user?.sub || req.user?.id || req.user?.userId;
    if (!userId) {
      return { error: 'User ID not found' };
    }
    return this.drillGridService.update(id, dto, userId);
  }

  // === FLOWCHART ENDPOINTS ===

  @Post(':id/flowchart')
  async createFlowchart(
    @Param('id') constructorId: string,
    @Body() dto: CreateFlowchartDto,
    @Request() req: any
  ) {
    const userId = req.user?.sub || req.user?.id || req.user?.userId;
    if (!userId) {
      return { error: 'User ID not found' };
    }
    return this.flowchartService.create(constructorId, dto, userId);
  }

  @Get(':id/flowchart')
  async getFlowchart(@Param('id') id: string, @Request() req: any) {
    const userId = req.user?.sub || req.user?.id || req.user?.userId;
    if (!userId) {
      return { error: 'User ID not found' };
    }
    return this.flowchartService.findOne(id, userId);
  }

  @Put(':id/flowchart')
  async updateFlowchart(
    @Param('id') id: string,
    @Body() dto: Partial<CreateFlowchartDto>,
    @Request() req: any
  ) {
    const userId = req.user?.sub || req.user?.id || req.user?.userId;
    if (!userId) {
      return { error: 'User ID not found' };
    }
    return this.flowchartService.update(id, dto, userId);
  }

  // === PATTERN-CARD ENDPOINTS ===

  @Post(':id/pattern-card')
  async createPatternCard(
    @Param('id') constructorId: string,
    @Body() dto: CreatePatternCardDto,
    @Request() req: any
  ) {
    const userId = req.user?.sub || req.user?.id || req.user?.userId;
    if (!userId) {
      return { error: 'User ID not found' };
    }
    return this.patternCardService.create(constructorId, dto, userId);
  }

  // Специфичные роуты должны быть ПЕРЕД общим @Get(':id/pattern-card')
  @Get(':id/pattern-card/stages/:stage')
  async getPatternCardStage(
    @Param('id') id: string,
    @Param('stage') stage: 'example' | 'blanks' | 'spontaneous',
    @Request() req: any
  ) {
    const userId = req.user?.sub || req.user?.id || req.user?.userId;
    if (!userId) {
      return { error: 'User ID not found' };
    }
    return this.patternCardService.getStage(id, stage, userId);
  }

  @Post(':id/pattern-card/fill')
  async fillPatternCard(
    @Param('id') id: string,
    @Body() body: { answers: { blankId: string; answer: string }[] },
    @Request() req: any
  ) {
    const userId = req.user?.sub || req.user?.id || req.user?.userId;
    if (!userId) {
      return { error: 'User ID not found' };
    }
    return this.patternCardService.fillPattern(id, body.answers, userId);
  }

  @Get(':id/pattern-card')
  async getPatternCard(@Param('id') id: string, @Request() req: any) {
    const userId = req.user?.sub || req.user?.id || req.user?.userId;
    if (!userId) {
      return { error: 'User ID not found' };
    }
    return this.patternCardService.findOne(id, userId);
  }

  @Put(':id/pattern-card')
  async updatePatternCard(
    @Param('id') id: string,
    @Body() dto: Partial<CreatePatternCardDto>,
    @Request() req: any
  ) {
    const userId = req.user?.sub || req.user?.id || req.user?.userId;
    if (!userId) {
      return { error: 'User ID not found' };
    }
    return this.patternCardService.update(id, dto, userId);
  }
}
