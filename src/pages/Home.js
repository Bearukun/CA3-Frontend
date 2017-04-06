import React, {Component} from 'react'
// import auth from '../authorization/auth'
import {observer} from "mobx-react";

const Home = observer(class Home extends Component {

    render() {
        return (
            <div>
                <h3>Home view<br /></h3>
                <p>Info about this site</p>
            </div>
        )
    }
})

export default Home;


