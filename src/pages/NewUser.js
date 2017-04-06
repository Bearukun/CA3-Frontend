import React from 'react'
import adminStore from '../stores/adminStore';
import { hashHistory } from 'react-router'


class NewUser extends React.Component{
    constructor(){
        super();
        this.state = {
            user:{
                USER_NAME: "",
                PASSWORD_HASH: "",
                roles_ROLE_NAME: "",
                users_USER_NAME: ""
            }
        };
    }

    handleChange = (event) => {
        // this.setState({value: event.target.value});
        var user = this.state.user;
        var id = event.target.id;

        if(id === "USER_NAME"){
            user.USER_NAME = event.target.value;
        } if(id === "PASSWORD_HASH"){
            user.PASSWORD_HASH= event.target.value;
        } if(id === "roles_ROLE_NAME"){
            user.roles_ROLE_NAME = event.target.value;
        } if(id === "users_USER_NAME"){
            user.users_USER_NAME = event.target.value;
        }

        this.setState({user});
    }

    render(){
        let id = this.props.params.username;
         let theuser = adminStore.users.filter((user) => {
             return user.username === String(id);
         })[0];
        if(id != null) {//if editing a book
            //ensure default values are saved if user does not change input fields:
            this.state.user.USER_NAME = theuser.username;
            this.state.user.roles_ROLE_NAME = theuser.roles;
            // this.state.user.roles_ROLE_NAME = theuser.roles_ROLE_NAME;
            // this.state.user.users_USER_NAME = theuser.users_USER_NAME;

            return (
                <div>
                    <h2>Edit User</h2>
                    <form>
                        <input onChange={this.handleChange} id="USER_NAME" type="text" defaultValue={theuser.username}/><br/>
                        <input onChange={this.handleChange} id="roles_ROLE_NAME" type="text" defaultValue={theuser.roles}/><br/>
                        {/*<input onChange={this.handleChange} id="roles_ROLE_NAME" type="text" defaultValue={theuser.roles_ROLE_NAME}/><br/>*/}
                        {/*<input onChange={this.handleChange} id="users_USER_NAME" type="text" defaultValue={theuser.users_USER_NAME}/><br/>*/}
                        <button id={id} onClick={this.editUser}>Save User</button>
                        <p>{JSON.stringify(this.state.user)}</p>
                    </form>
                </div>
            )

        } else {


            return (
                <div>
                    <h2>New User</h2>
                    <form>
                        <input onChange={this.handleChange} id="USER_NAME" type="text" placeholder="New User"/><br/>
                        <input onChange={this.handleChange} id="roles_ROLE_NAME" type="text" placeholder="New Role"/><br/>
                        {/*<input onChange={this.handleChange} id="roles_ROLE_NAME" type="text" placeholder={theuser.roles_ROLE_NAME}/><br/>*/}
                        {/*<input onChange={this.handleChange} id="users_USER_NAME" type="text" placeholder={theuser.users_USER_NAME}/><br/>*/}
                        <button id={id} onClick={this.addUser}>Save User</button>
                        <p>{JSON.stringify(this.state.user)}</p>
                    </form>
                </div>
            )
        }



        //  console.log(user.username.length)
        // return(
        //     <div>
        //         <h4>{id}</h4>
        //         <h5>{user.username}</h5>
        //         <h5>{user.roles}</h5>
        //
        //
        //         </div>
        // )
    }

    addUser = (event)=> {
        event.preventDefault();
        // console.log(event.target.id);//target refers to the button pressed
        // console.log(this.state.book);//target refers to the button pressed
        adminStore.addUser(this.state.user);
        hashHistory.push('/products');
    }

    editUser = (event)=> {
        event.preventDefault();
        this.state.user.username = event.target.id;
        adminStore.editUser(this.state.user);
        hashHistory.push('/products');
    }

}

export default NewUser
