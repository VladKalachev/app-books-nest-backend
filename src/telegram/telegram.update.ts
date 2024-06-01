import {
  Command,
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
import { ConfigService } from '@nestjs/config';
import { BookService } from 'src/book/book.service';
import { TokenService } from 'src/auth/token/token.service';
import { UnauthorizedException } from '@nestjs/common';
import { TOKEN_NOT_FOUND_ERROR } from 'src/auth/auth.constants';

@Update()
export class TelegramUpdate {
  user: any = null;

  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly telegramService: TelegramService,
    private readonly configService: ConfigService,
    private readonly bookService: BookService,
    private readonly tokenService: TokenService,
  ) {
    this.bot.telegram.setMyCommands([
      {
        command: 'start',
        description: 'Запустить бота',
      },
      {
        command: 'login',
        description: 'Авторизация пользователя',
      },
      {
        command: 'logout',
        description: 'Разлогин пользователя',
      },
    ]);
  }

  @Start()
  async startCommand(ctx: Context) {
    await ctx.reply(`Привет, ${ctx.message.from.first_name}!`);
    await ctx.reply('Что ты хочешь сделать?', actionButtons());
  }

  @Command('login')
  async loginCommand(ctx: Context) {
    await ctx.reply(`Привет, ${ctx.message.from.first_name}!`);
    const message =
      'Для авторизации перейдите на <a href="https://mybookroom.ru/login">эту ссылку</a> и авторизуйтесь, после чего вы будет автоматически залогинены в боте';
    await ctx.replyWithHTML(message);
  }

  @Command('logout')
  async logoutCommand(ctx: Context) {
    await ctx.reply(`Пользователь ${this.user?.email} разлогинен!`);
    this.user = null;
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
    await ctx.reply(
      `Для добавления новой книги введите значения в таком формате: 
        Название книги | Описание книги`,
    );
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
      const [bookName, bookDescription] = message.split(' | ');

      if (!bookName || !bookDescription) {
        await ctx.reply('Данные введены не верно');
        return;
      }

      if (this.user) {
        const userData = this.tokenService.validateRefreshToken(
          this.user.refreshToken,
        );

        // TODO перенести в validateRefreshToken
        if (!userData) {
          throw new UnauthorizedException(TOKEN_NOT_FOUND_ERROR);
        }
        try {
          const book = await this.bookService.create(
            {
              title: bookName,
              description: bookDescription,
              genre: '',
              fullName: '',
              numberPages: 0,
              publishing: '',
              publishingId: null,
              authorId: null,
              genreId: null,
              notes: '',
              read: false,
              buy: false,
            },
            userData,
          );

          const message = `Книга <a href="https://mybookroom.ru/books/${book.id}/edit">${book.title}</a> успешно добавлена!`;
          await ctx.replyWithHTML(message);
        } catch (error) {
          console.error(error);
        }
      } else {
        await ctx.reply('Пользователь не авторизован');
      }
    }
  }

  async sendMessage(message: string) {
    const chatId = this.configService.get<string>('CHAT_ID');
    await this.bot.telegram.sendMessage(chatId, message);
  }

  async setUserToken(user: any) {
    this.user = user;
  }
}
