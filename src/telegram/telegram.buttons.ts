import { Markup } from 'telegraf';
import { FIND_BOOK, CREATE_BOOK } from './telegram.constants';

export function actionButtons() {
  return Markup.keyboard(
    [
      Markup.button.callback(FIND_BOOK, 'find'),
      Markup.button.callback(CREATE_BOOK, 'create'),
    ],
    {
      columns: 2,
    },
  );
}
