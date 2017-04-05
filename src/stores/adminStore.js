
import { observable, action } from "mobx";
import fetchHelper from "./fetchHelpers"
import {computed} from "../../node_modules/mobx/lib/mobx";
const URL = require("../../package.json").serverURL;

/* encapsulates Data related to Admins */
class AdminStore {
  @observable messageFromServer = "";
  @observable errorMessage = "";
  @observable _users = [];

  @action
  setErrorMessage(err) {
    this.errorMessage = err;
  }
  @action
  setMessageFromServer(msg) {
    this.messageFromServer = msg;
  }


    // @action
    // getUsers = () => {
    //     this.errorMessage = "";
    //     this.messageFromServer = "";
    //     let errorCode = 200;
    //     const options = fetchHelper.makeOptions("GET", true);
    //     var conf = {
    //         method: 'get',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //             'Access-Control-Allow-Origin': '*',
    //             'Authorization': 'Admin'
    //         }
    //     };
    //     // fetch(URL + "api/demoadmin/all", options)
    //     fetch(URL + "api/demoadmin", options)
    //         .then((res) => {
    //             if (res.status > 210 || !res.ok) {
    //                 errorCode = res.status;
    //             }
    //             return res.json();
    //         })
    //         .then(action((res) => {  //Note the action wrapper to allow for useStrict
    //             if (errorCode !== 200) {
    //                 throw new Error(`${res.error.message} (${res.error.code})`);
    //             }
    //             else {
    //                 this._users.replace(res);
    //             }
    //         })).catch(err => {
    //         //This is the only way (I have found) to verify server is not running
    //         this.setErrorMessage(fetchHelper.addJustErrorMessage(err));
    //     })
    // }
    //
  @action
  getData = () => {
    this.errorMessage = "";
    this.messageFromServer = "";
    let errorCode = 200;
    const options = fetchHelper.makeOptions("GET", true);
    fetch(URL + "api/demoadmin", options)
      .then((res) => {
        if (res.status > 200 || !res.ok) {
          errorCode = res.status;
        }
        return res.json();
      })
      .then((res) => {
        if (errorCode !== 200) {
          throw new Error(`${res.error.message} (${res.error.code})`);
        }
        else {


          this._users.replace(res);
        }
      }).catch(err => {
        //This is the only way (I have found) to veryfy server is not running
        this.setErrorMessage(fetchHelper.addJustErrorMessage(err));
      })
  }
    @computed
    get users(){
        return this._users;
    }
  //   @action
  //   getData = () => {
  //       this.errorMessage = "";
  //       this.messageFromServer = "";
  //       let errorCode = 200;
  //       const options = fetchHelper.makeOptions("GET", true);
  //       fetch(URL + "api/demoadmin", options)
  //           .then((res) => {
  //               if (res.status > 200 || !res.ok) {
  //                   errorCode = res.status;
  //               }
  //               return res.json();
  //           })
  //           .then((res) => {
  //               if (errorCode !== 200) {
  //                   throw new Error(`${res.error.message} (${res.error.code})`);
  //               }
  //               else {
  //                   this.setMessageFromServer(res.message);
  //               }
  //           }).catch(err => {
  //           //This is the only way (I have found) to veryfy server is not running
  //           this.setErrorMessage(fetchHelper.addJustErrorMessage(err));
  //       })
  //   }

}
let adminStore = new AdminStore(URL);

//Only for debugging
//window.adminStore = adminStore;
export default adminStore;
