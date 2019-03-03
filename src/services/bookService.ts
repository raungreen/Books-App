import { Book } from '../model/book';
import http from 'axios';

const apiRoot = 'https://www.googleapis.com/books/v1/volumes';

export function getBooks(author: string): Promise<Book[]> {
  return new Promise((resolve, reject) => {
    let apiURL = `${apiRoot}?q=inauthor:"${author}"&langRestrict=en`;
    http.get(apiURL).then((response: any) => {
      console.log(response);
      let results: Book[] = response.data.items.map((item: any) => {
        return new Book(
          getSafe(() => item.volume.Info.title),
          getSafe(() => item.volumeInfo.authors),
          getSafe(() => item.volumeInfo.imageLinks.thumbnail)
        );
      });
      resolve(results);
    });
  });
}

function getSafe<T>(f: () => T): T | undefined {
  try {
    return f();
  } catch (error) {
    return undefined;
  }
}
