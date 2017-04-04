import { observable,computed,action,useStrict} from "mobx";
import { Component } from "react";



const URL = "http://localhost:4567/api/persons_changing";


useStrict(true);

class BookStore extends Component {

  @observable
  _books = [];

      constructor(){
          super();
          // this.loadBooks();

          // var a = [{ id: 1, title: "How to Learn JavaScript - Vol 1", info: "Study hard" }
          //     , { id: 2, title: "How to Learn ES6", info: "Complete all exercises :-)" }
          //     , {
          //     id: 3, title: "How to Learn React",
          //     info: "Complete all your CA's",moreInfo: ""
          //       }
          //     , {
          //     id: 4, title: "How to become a specialist in Computer Science - Vol 4",
          //     info: "Don't drink beers, until Friday (after four)",
          //     moreInfo: "5 Points = 5 beers ;-)"
          // }]
          // this._books.replace(a);
      }


     @action
    loadBooks = () =>{
         // var me = this;
         fetch(URL)
             .then(res => res.json())
             .then(action(result => {
                 this._books.replace(result);
                 console.log("aa "+result);
             }))
         // me._books.replace(result) }))
     }

    @computed
    get books(){
        return this._books;
    }

    @action
    addBook(book){
        this._books.push(book);
    }

    @computed
    get bookCount(){
       return this._books.length
    }

    @action
    deleteBook = (id)=>{
        // console.log("book: "+event.target.id);
        const bookToDelete = this._books.filter((book)=>{//bookToDelete is an array with only one element in this case!!!
                return book.id === Number(id);
            }
        )
        console.log(bookToDelete[0].title);
        // console.log("book found: "+bookToDelete.title);
        this._books.remove(bookToDelete[0]);
    }

}
export default new BookStore();