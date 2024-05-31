import { InjectBot, Start, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { actionButtons } from './telegram.buttons';

@Update()
export class TelegramUpdate {
  constructor(@InjectBot() private readonly bot: Telegraf<Context>) {}

  @Start()
  async startCommand(ctx: Context) {
    await ctx.reply(`Привет, ${ctx.message.from.first_name}!`);
    await ctx.reply('Что ты хочешь сделать?', actionButtons());
  }
}
