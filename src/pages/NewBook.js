import React from "react";
import UserStore from '../stores/userStore';
import { hashHistory } from 'react-router'

class NewBook extends React.Component{
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

render(){
        return (
            <div>
                <h2>New Book</h2>
                <form>
                    <input onChange={this.handleChange} id="title" type="text" placeholder="title"/><br/>
                    <input onChange={this.handleChange} id="info" type="text" placeholder="info"/><br/>
                    <input onChange={this.handleChange} id="moreInfo" type="text" placeholder="moreInfo"/><br/>
                    <button id="AddBookButton" onClick={this.addBook}>Save book</button>
                    <p>{JSON.stringify(this.state.book)}</p>
                </form>
            </div>
        )
    }

    addBook = (event)=> {
        event.preventDefault();
        // console.log(event.target.id);//target refers to the button pressed
        console.log(this.state.book);//target refers to the button pressed
        UserStore.addBook(this.state.book);
        hashHistory.push('/products');
    }
}
export default NewBook;

// const addedBookTitle = UserStore.addBook(this.state.book);
//const book = event.props.book.title;//save id of button, which is identical to the id of the book to be deleted
// UserStore.deleteBook(id);
// console.log(deletedBookTitle);
// window.alert(feedback);