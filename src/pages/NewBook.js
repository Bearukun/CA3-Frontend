import React from "react";
import UserStore from '../stores/userStore';
import { hashHistory } from 'react-router'

class NewBook extends React.Component{
    constructor(){
        super();
        this.state = {
            book:{
                id: 40,
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

    addBook(event) {
        event.preventDefault();
        console.log(event.target);
        //const book = event.props.book.title;//save id of button, which is identical to the id of the book to be deleted
        // UserStore.deleteBook(id);
        const addedBookTitle = UserStore.addBook(this.state.book);
        // console.log(deletedBookTitle);
        // window.alert(feedback);
        hashHistory.push('/products');
    }
}
export default NewBook();