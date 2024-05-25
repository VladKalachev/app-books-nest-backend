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
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { TOKEN_NOT_FOUND_ERROR } from 'src/auth/auth.constants';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { TokenService } from 'src/auth/token/token.service';
import { Cookies } from 'src/decorators/cookies.decorator';
import { CreateGoalDto } from './dto/create-goal.dto';
import { GoalService } from './goal.service';

@ApiBearerAuth()
@ApiTags('Goals')
@Controller('goals')
export class GoalController {
  constructor(
    private readonly goalService: GoalService,
    private readonly tokenService: TokenService,
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Получение всего списка Целей' })
  @ApiQuery({ name: 'search', required: false })
  async all(
    @Cookies('refreshToken') refreshToken: string,
    @Query('search') search?: string,
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
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Получение Цели по id' })
  async one(@Param('id') id: string) {
    return this.goalService.findById(parseInt(id));
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Удаление Цели по id' })
  async remove(@Param('id') id: string) {
    return this.goalService.deleteById(parseInt(id));
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Обновление Цели по id' })
  async update(@Param('id') id: string, @Body() dto: CreateGoalDto) {
    return this.goalService.updateById(parseInt(id), dto);
  }

  @Put(':id/completed')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Выполнить цель' })
  async completed(
    @Param('id') id: string,
    @Body('completed') completed: boolean,
  ) {
    return this.goalService.completed(parseInt(id), completed);
  }
}
