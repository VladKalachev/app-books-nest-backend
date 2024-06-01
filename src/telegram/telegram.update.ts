import {
  Ctx,
  Hears,
  InjectBot,
  Message,
  On,
  Start,
  Update,
} from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { actionButtons } from './telegram.buttons';
import {
  FIND_BOOK,
  CREATE_BOOK,
  NOT_FIND_BOOK_ERROR,
} from './telegram.constants';
import { Context } from './telegram.interface';
import { TelegramService } from './telegram.service';
import { showBooks } from './telegram.utils';

@Update()
export class TelegramUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly telegramService: TelegramService,
  ) {
    this.bot.telegram.setMyCommands([
      {
        command: 'start',
        description: 'Запустить бота',
      },
    ]);
  }

  @Start()
  async startCommand(ctx: Context) {
    await ctx.reply(`Привет, ${ctx.message.from.first_name}!`);
    await ctx.reply('Что ты хочешь сделать?', actionButtons());
  }

  @Hears(FIND_BOOK)
  async findBook(ctx: Context) {
    ctx.session.type = 'find';
    await ctx.reply('Введите название книги');
  }

  @Hears(CREATE_BOOK)
  async createBook(ctx: Context) {
    ctx.session.type = 'create';
    await ctx.deleteMessage();
    await ctx.reply('Введите название книги');
  }

  @On('text')
  async getMessage(@Message('text') message: string, @Ctx() ctx: Context) {
    if (!ctx.session.type) return;

    if (ctx.session.type === 'find') {
      const books = await this.telegramService.findBookByName(message);
      if (!books.length) {
        await ctx.reply(NOT_FIND_BOOK_ERROR);
        return;
      }

      await ctx.replyWithHTML(showBooks(books));
    }

    if (ctx.session.type === 'create') {
      console.log('create book');
    }
  }
}
