import React from "react";
import {Link} from "react-router";
import {observer} from "mobx-react";
import { hashHistory } from 'react-router';
import userData from '../stores/userStore';

@observer
export default class Products extends React.Component {
    componentWillMount() {
        /*
         This will fetch data each time you navigate to this route
         Move to constructor, if only required once, or add "logic" to determine when data should be "refetched"
         */
        userData.getBooks();
    }

    render(){


        // var lis = userData.books.map(function(book){
        //     return(
        //         <li key={book.id}>{book.title} List here!</li>
        //     )
        //
        // })


    return (
            (

                <div>


                    <h2>Our Products</h2>
                    <button onClick={this.onNewBook}>Add Book</button>
                    <h4>All our great books</h4>

                    {/*Replaced "this.props.books" with "userData"*/}
                    <ul>{userData.books.map((book, index) => <li key={book.id}>
                        {book.title} <Link to={`products/details/${book.id}`}>(details)</Link></li>)}
                        {/*{this.props.route.books.map((book, index) => <li key={book.id}>*/}
                            {/*{book.title} <Link to={`products/details/${book.id}`}>(details)</Link></li>)}*/}
                    </ul>



                </div>

            )
        )
    }
    onNewBook = ()=>{
        hashHistory.push('products/add');

    }
}