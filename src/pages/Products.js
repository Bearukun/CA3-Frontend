import React from "react";
import {Link} from "react-router"
import {observer} from "mobx-react";
import { hashHistory } from 'react-router'

@observer
export default class Products extends React.Component {
    render(){
        return (
            (
                <div>
                    <h2>Our Products</h2>
                    <button onClick={this.onNewBook}>Add Book</button>
                    <h4>All our great books </h4>
                    <ul>
                        {this.props.route.books.map((book, index) => <li key={book.id}>
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