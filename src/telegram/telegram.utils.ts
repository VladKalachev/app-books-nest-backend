export const showBooks = (books) => {
  const title = (book) => 'Название:' + ' ' + book.title + '\n';
  const description = (book) =>
    book.description
      ? 'Описание:' + ' ' + book.description + '\n'
      : 'Описание:' + ' ' + '-';
  const fullName = (book) =>
    book.fullName ? 'Автор:' + ' ' + book.fullName : 'Автор:' + ' ' + '-';

  return `
    Ваш список книг:\n\n${books.map((book) => title(book) + description(book) + fullName(book) + '\n\n').join('')}
    `;
};
