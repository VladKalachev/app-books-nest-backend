import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
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
import { BookService } from 'src/book/book.service';
import { Cookies } from 'src/decorators/cookies.decorator';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import {
  GOAL_ALREADY_EXISTS_ERROR,
  GOAL_NOT_FOUND_ERROR,
} from './goal.constants';
import { GoalService } from './goal.service';

@ApiBearerAuth()
@ApiTags('Goals')
@Controller('goals')
export class GoalController {
  constructor(
    private readonly goalService: GoalService,
    private readonly tokenService: TokenService,
    private readonly bookService: BookService,
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

    const book = await this.bookService.findOne(dto.bookId);

    const goal = await this.goalService.findByBookId(book.id);

    if (goal) {
      throw new BadRequestException(GOAL_ALREADY_EXISTS_ERROR);
    }

    let read = false;
    let numberPages = 0;

    if (book !== null) {
      read = book.read;
      numberPages = book?.numberPages;
    } else {
      read = dto.completed;
    }

    return this.goalService.create({
      title: dto.title,
      completed: read,
      bookId: dto.bookId,
      userId: userData.id,
      currentPages: dto.currentPages ? dto.currentPages : 0,
      numberPages,
    });
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Получение Цели по id' })
  async one(@Param('id') id: string) {
    const goal = await this.goalService.findById(+id);
    if (!goal) {
      throw new NotFoundException(GOAL_NOT_FOUND_ERROR);
    }
    return goal;
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Удаление Цели по id' })
  async remove(@Param('id') id: string) {
    const deletedGoal = await this.goalService.deleteById(+id);
    if (!deletedGoal) {
      throw new NotFoundException(GOAL_NOT_FOUND_ERROR);
    }

    return deletedGoal;
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Обновление Цели по id' })
  async update(@Param('id') id: string, @Body() dto: UpdateGoalDto) {
    const updatedGoal = await this.goalService.updateById(parseInt(id), dto);
    if (!updatedGoal) {
      throw new NotFoundException(GOAL_NOT_FOUND_ERROR);
    }
    return updatedGoal;
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
