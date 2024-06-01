import { ModuleMetadata } from '@nestjs/common';
import { Context as ContextTelegraf } from 'telegraf';

export interface ITelegramOptions {
  chatId: string;
  token: string;
}

export interface ITelegramModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (...args: any[]) => Promise<ITelegramOptions> | ITelegramOptions;
  inject?: any[];
}

export interface Context extends ContextTelegraf {
  session: {
    type: 'find' | 'create';
  };
}
