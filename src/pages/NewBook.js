import React from "react";
import BookStore from "./BookStore";
import { hashHistory } from 'react-router'

export default class NewBook extends React.Component{
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

    saveBook= (event)=> {
        //window.alert("lkjd");
        BookStore.addBook(this.state.book);
        hashHistory.push("/products");
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
                    <button onClick={this.saveBook}>Save book</button>
                    <p>{JSON.stringify(this.state.book)}</p>
                </form>
            </div>
        )
    }
}