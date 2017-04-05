import React from "react";
import {Link} from "react-router";
import {observer} from "mobx-react";
import { hashHistory } from 'react-router';
import UserStore from '../stores/userStore';
import auth from '../authorization/auth';

@observer
export default class Products extends React.Component {

    constructor() {
        super();
        UserStore.getBooks();//fetches data
    }

    componentWillMount() {
        /*
         This will fetch data each time you navigate to this route
         Move to constructor, if only required once, or add "logic" to determine when data should be "refetched"
         */
        UserStore.getBooks();
    }

    render(){
    return (
            (
                <div>
                    <h2>Our Products</h2>
                    {auth.loggedIn && auth.isUser?//only show if logged in and a user
                    <button onClick={this.onNewBook}>Add Book</button>
                        : null}

                    <h4>All our great books</h4>
                    <ul>{UserStore.books.map((book, index) => <li key={book.id}>
                        {book.title} <Link to={`products/details/${book.id}`}>(details)</Link></li>)}
                    </ul>
                </div>
            )
        )
    }
    onNewBook = ()=>{
        hashHistory.push('products/add');
    }
}