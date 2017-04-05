import { observable, action, computed} from "mobx";
import fetchHelper from "./fetchHelpers"
const URL = require("../../package.json").serverURL;

class UserStore {
    @observable messageFromServer = "";
    @observable errorMessage = "";
    @observable _books = [];

    @action
    setErrorMessage = (err) => {
    this.errorMessage = err;
    }

    @action
    getBooks = () => {
        this.errorMessage = "";
        this.messageFromServer = "";
        let errorCode = 200;
        const options = fetchHelper.makeOptions("GET", true);
        fetch(URL + "api/demoall/all", options)
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
                    this._books.replace(res);
                }
            })).catch(err => {
            //This is the only way (I have found) to verify server is not running
            this.setErrorMessage(fetchHelper.addJustErrorMessage(err));
        })
    }

    @computed
    get books(){
        return this._books;
    }

    @action
    deleteBook = (id) => {
        console.log("book id: "+id);//check the id to ensure we've got hold of the right book to delete
        this.errorMessage = "";
        this.messageFromServer = "";
        let errorCode = 200;
        const options = fetchHelper.makeOptions("DELETE", true);
        fetch(URL + "api/demoall/delete/"+id, options)
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
                    const deletedBookTitle = res.title;
                    return deletedBookTitle;
                    // this._books.replace(res);
                    // this.getBooks();//if book successfully deleted, re-run get books to update local list from new database list
                }
            })).catch(err => {
            //This is the only way (I have found) to verify server is not running
            this.setErrorMessage(fetchHelper.addJustErrorMessage(err));
        })
    }

    @action
    addBook = (book)=> {

        // console.log(book.title);
        this.errorMessage = "";
        this.messageFromServer = "";
        let errorCode = 200;
        const options = fetchHelper.makeOptions("POST", true);
        var conf = {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: book.title,
                info: book.info,
                moreInfo: book.moreInfo
            })
        };
        fetch(URL + "api/demoall", conf, options)
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
                    const addedBookTitle = res.title;
                    return addedBookTitle;
                    // this._books.replace(res);
                    // this.getBooks();//if book successfully deleted, re-run get books to update local list from new database list
                }
            })).catch(err => {
            //This is the only way (I have found) to verify server is not running
            this.setErrorMessage(fetchHelper.addJustErrorMessage(err));
        })
        // UserStore.addBook(this.state.book);
        // hashHistory.push("/products");
    }

    @action
    editBook = (book)=> {
        this.errorMessage = "";
        this.messageFromServer = "";
        let errorCode = 200;
        const options = fetchHelper.makeOptions("POST", true);
        var conf = {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: book.id,
                title: book.title,
                info: book.info,
                moreInfo: book.moreInfo
            })
        };
        fetch(URL + "api/demoall/edit", conf, options)
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
                    // if (res.title) {
                    // }
                }
            })).catch(err => {
            //This is the only way (I have found) to verify server is not running
            this.setErrorMessage(fetchHelper.addJustErrorMessage(err));
        })
        // UserStore.addBook(this.state.book);
        // hashHistory.push("/products");
    }


    // function addPerson(){
    //     var url = "https://139.59.212.171.xip.io/TheBlankPages/api/person";
    //     var conf = {
    //         method: 'post',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             firstName: fname.value,
    //             lastName: lname.value,
    //             email: email.value,
    //             phones: [{number:phone.value,description:phoneDesc.value}],
    //             address: {street:street.value, additionalInfo:additionalInfo.value, cityInfo:{zipCode: zipCode.value}}
    //         })
    //     };
    //
    //     var promise = fetch(url, conf);
    //     promise.then(function(response){
    //         return response.text();
    //     }).then(function(text){
    //         document.getElementById("formPerson").reset();
    //         document.getElementById("formPerson").style.display='none';
    //         alert("Person added: "+text);
    //     });
    // }


    // @action
    // addBook(book){
    //     this._books.push(book);
    // }

    @computed
    get bookCount(){
        return this._books.length
    }
}
export default new UserStore();