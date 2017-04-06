import React from "react";
import {Link, hashHistory} from "react-router";
import UserStore from '../stores/userStore';
import auth from '../authorization/auth';

export default class BookDetails extends React.Component {
    // componentWillMount() {
    //     /*
    //      This will fetch data each time you navigate to this route
    //      Move to constructor, if only required once, or add "logic" to determine when data should be "refetched"
    //      */
    //     UserStore.getBooks();
    // }


    constructor(){
        super();
        this.state = {
            book:{
                title: "",
                info: "",
                moreInfo: ""
            }
        };
    }



    handleChange = (event) => {
        // this.setState({value: event.target.value});

        var book = this.state.book;
        var id = event.target.id;
        if(id === "title"){
            book.title = event.target.value;
        } if(id === "info"){
            book.info = event.target.value;
        } if(id === "moreInfo"){
            book.moreInfo = event.target.value;
        }
        this.setState({book});
    }

    render() {
        let id = this.props.params.id;
        let book = UserStore.books.filter((book) => {
          return book.id === Number(id);
        })[0];
        return (
          <div>
            <h3 style={{color: "steelblue"}}>Detailed info for the title: {book.title}</h3>
            <h4> {book.info}</h4>
            <h4>{book.moreInfo}</h4>
              {auth.loggedIn && auth.isUser?//only show if logged in and a user
                  <button id={id} onClick={this.removeBook}>Remove book</button>
              : null}
              {auth.loggedIn && auth.isUser?//only show if logged in and a user
                  <Link to={`/products/add/${id}`}>Edit Book</Link>
                  : null}
            <br />
            <Link to="/products">Products</Link>
          </div>
        );
  }

  removeBook(event) {
      const id = event.target.id;//save id of button, which is identical to the id of the book to be deleted
      UserStore.deleteBook(id);
      // const deletedBookTitle = UserStore.deleteBook(id);
      // console.log(deletedBookTitle);

      hashHistory.push('/products');
  }

    editBook(event) {
        // const id = event.target.id;//save id of button, which is identical to the id of the book to be deleted
        UserStore.editBook(this.state.book);
        hashHistory.push('/products');
    }

    // onEditBook = (event)=>{
    //     const id = event.target.id;//save id of button, which is identical to the id of the book to be deleted
    //
    //     const editedBookTitle = UserStore.editBook(id);
    //     hashHistory.push('products/add');
    // }
}