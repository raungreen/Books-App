import * as React from 'react';
import './App.css';
import { Book } from './model/book';
import * as BookService from './services/bookService';

interface HeaderProps {
  title: string;
}

const HeaderComponent = (props: HeaderProps) => {
  return (
    <header className="App-header">
      <h1 className="App-title">{props.title}</h1>
    </header>
  );
};

interface BookProps {
  item: Book;
}

const BookItemComponent = (props: BookProps) => {
  return (
    <li>
      <img src={props.item.coverImage} />
      <strong>{props.item.authors[0]}</strong> {props.item.title}
    </li>
  );
};

interface BookListProps {
  data: Book[];
}

const BookListComponent = (props: BookListProps) => {
  return (
    <ul className="Book-list">
      {props.data.map(item => {
        return <BookItemComponent item={item} />;
      })}
    </ul>
  );
};

interface SearchState {
  searchString: string;
}

interface SearchProps {
  submit: (searchString: string) => void;
}

class SearchComponent extends React.Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = { searchString: '' };
  }
  submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.submit(this.state.searchString);
  };
  inputChanged = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ searchString: event.currentTarget.value });
  };
  render() {
    return (
      <form onSubmit={this.submit} className="Search-form">
        <label htmlFor="author">Search for author:&nbsp;</label>
        <input
          value={this.state.searchString}
          onChange={this.inputChanged}
          type="text"
          id="author"
          name="author"
        />
        &nbsp;
        <button type="submit">Submit</button>
      </form>
    );
  }
}

// const SearchComponent = () => {
//   let authorInput: HTMLInputElement | null = null;
//   const submit = () => {
//     if(authorInput) {
//       alert(authorInput.value);
//     }
//   }
//   return (
//     <form onSubmit={submit} className="Search-form">
//     <label htmlFor="author">Search for author:&nbsp;</label>
//     <input ref={input => {authorInput=input}} type="text" id="author" name="author"/>&nbsp;
//     <button type="submit">Submit</button>
//     </form>
//   );
// }

// const welcomeElement =
// (
//   <div className="App">

//         <p className="App-intro">
//           Welcome to Books App!
//         </p>
//       </div>
// );

interface AppState {
  searchString: string;
  searchResults: Book[];
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = { searchString: '', searchResults: [] };
  }
  submit = (searchString: string) => {
    BookService.getBooks(searchString).then(books => {
      this.setState({ searchString: searchString, searchResults: books });
    });
  };
  render() {
    return (
      <div className="App">
        <HeaderComponent title="Books App" />
        <SearchComponent submit={this.submit} />
        <BookListComponent data={this.state.searchResults} />
      </div>
    );
  }
}

// const App = () => {
//   return (
//     <div className="App">
//       <HeaderComponent title="Books App" />
//       <SearchComponent />
//       <BookListComponent data={BookService.getBooks("Stephen King")}/>
//     </div>
//   );
// };

export default App;
