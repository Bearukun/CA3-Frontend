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

    addBook = (book)=> {
        console.log(book.title);
        // UserStore.addBook(this.state.book);
        // hashHistory.push("/products");
    }


    @action
    addBook(book){
        this._books.push(book);
    }

    @computed
    get bookCount(){
        return this._books.length
    }
}
export default new UserStore();