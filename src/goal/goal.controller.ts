import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TOKEN_NOT_FOUND_ERROR } from 'src/auth/auth.constants';
import { TokenService } from 'src/auth/token/token.service';
import { Cookies } from 'src/decorators/cookies.decorator';
import { CreateGoalDto } from './dto/create-goal.dto';
import { GoalService } from './goal.service';

@ApiBearerAuth()
@ApiTags('Goals')
@Controller('goal')
export class GoalController {
  constructor(
    private readonly goalService: GoalService,
    private readonly tokenService: TokenService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Получение всего списка Целей' })
  async all(
    @Query('search') search: string,
    @Cookies('refreshToken') refreshToken: string,
  ) {
    const userData = this.tokenService.validateRefreshToken(refreshToken);

    // TODO перенести в validateRefreshToken
    if (!userData) {
      throw new UnauthorizedException(TOKEN_NOT_FOUND_ERROR);
    }
    return this.goalService.getAllGoalsByUserId(userData.id, search);
  }

  @UsePipes(new ValidationPipe())
  @Post('create')
  @ApiOperation({ summary: 'Получение всего списка Целей' })
  async create(
    @Body() dto: CreateGoalDto,
    @Cookies('refreshToken') refreshToken: string,
  ) {
    const userData = this.tokenService.validateRefreshToken(refreshToken);

    // TODO перенести в validateRefreshToken
    if (!userData) {
      throw new UnauthorizedException(TOKEN_NOT_FOUND_ERROR);
    }

    dto.userId = userData.id;
    return this.goalService.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получение Цели по id' })
  async one(@Param('id') id: string) {
    return this.goalService.findById(parseInt(id));
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление Цели по id' })
  async remove(@Param('id') id: string) {
    return this.goalService.deleteById(parseInt(id));
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @ApiOperation({ summary: 'Обновление Цели по id' })
  async update(@Param('id') id: string, @Body() dto: CreateGoalDto) {
    return this.goalService.updateById(parseInt(id), dto);
  }

  @Put(':id/completed')
  @ApiOperation({ summary: 'Выполнить цель' })
  async completed(
    @Param('id') id: string,
    @Body('completed') completed: boolean,
  ) {
    return this.goalService.completed(parseInt(id), completed);
  }
}
