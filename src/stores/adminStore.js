
import { observable, action } from "mobx";
import fetchHelper from "./fetchHelpers"
import {computed} from "../../node_modules/mobx/lib/mobx";
const URL = require("../../package.json").serverURL;

/* encapsulates Data related to Admins */
class AdminStore {
  @observable messageFromServer = "";
  @observable errorMessage = "";
  @observable _users = [];
    //
    // constructor() {
    //     this.getData();
    // }

  @action
  setErrorMessage(err) {
    this.errorMessage = err;
  }
  @action
  setMessageFromServer(msg) {
    this.messageFromServer = msg;
  }

    @action
    getData = () => {
        this.errorMessage = "";
        this.messageFromServer = "";
        let errorCode = 200;
        const options = fetchHelper.makeOptions("GET", true);

        fetch(URL + "api/admin/all", options)
            .then((res) => {
                if (res.status > 210 || !res.ok) {
                    errorCode = res.status;
                }
                return res.json();
            })
            .then(action((res) => {  //Note the action wrapper to allow for useStrict
                if (errorCode !== 200) {
                    throw new Error(`${res.error.message} (${res.error.code})`);
                }
                else {
                    this._users.replace(res.users);
                }
            })).catch(err => {
            //This is the only way (I have found) to verify server is not running
            this.setErrorMessage(fetchHelper.addJustErrorMessage(err));
        })
    };
    @action
    deleteUser = (userName) => {
        // console.log("book id: "+id);//check the id to ensure we've got hold of the right book to delete
        this.errorMessage = "";
        this.messageFromServer = "";
        let errorCode = 200;
        const options = fetchHelper.makeOptions("DELETE", true);
        fetch(URL + "api/admin/delete/"+userName, options)
            .then((res) => {
                if (res.status > 210 || !res.ok) {
                    errorCode = res.status;
                }
                return res.json();
            })
            .then(action((res) => {  //Note the action wrapper to allow for useStrict
                if (errorCode !== 200) {
                    throw new Error(`${res.error.message} (${res.error.code})`);
                }
                else {
                    console.log("deletedUser: "+res.title);
                    // const deletedBookTitle = res.title;
                    // return deletedBookTitle;
                    // this._books.replace(res);
                    // this.getBooks();//if book successfully deleted, re-run get books to update local list from new database list
                }
            })).catch(err => {
            //This is the only way (I have found) to verify server is not running
            this.setErrorMessage(fetchHelper.addJustErrorMessage(err));
        })
    }




    @computed
    get users(){
        return this._users;
    }
}
let adminStore = new AdminStore(URL);

//Only for debugging
//window.adminStore = adminStore;
export default adminStore;
