// Here we will need state, so we create it as a Class-based component.
import React from "react";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import AddRandomContact from "./AddRandomContact";
import RemoveAllContacts from "./RemoveAllContacts";
import AddContact from "./AddContact";
import FavoriteContacts from "./FavoriteContacts";
import GeneralContacts from "./GeneralContacts";

class ContactIndex extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            contactList:[
                {
                    id:1,
                    name:"Chrisanthi Mihelioudakis",
                    email:"chris.mdks@gmail.com",
                    phone:"(+30)69XXXXXXXX",
                    isFavorite:false
                },
                {
                    id:2,
                    name:"Ben Smith",
                    email:"bensm@email.com",
                    phone:"(+30)69XXXXXXXX",
                    isFavorite:true
                },
                {
                    id:3,
                    name:"Kate Miller",
                    email:"kmiller@email.com",
                    phone:"(+30)69XXXXXXXX",
                    isFavorite:true
                }
            ]
        }
    }

    render(){
        let generals = this.state.contactList.filter((u) => u.isFavorite === false);
        let favorites = this.state.contactList.filter((u) => u.isFavorite === true);

        let hasGeneral = (generals.length > 0);
        let hasFavorite = (favorites.length > 0);

        return(
            <div>
                <Header/>
                <div className="container" style={{minHeight:"85vh"}}>
                    <div className="row py-3">
                        <div className="col-4 offset-2">
                            <AddRandomContact/>
                        </div>
                        <div className="col-4">
                            <RemoveAllContacts/>
                        </div>
                    </div>
                    <div className="row py-2">
                        <AddContact/>
                    </div>
                    <div className="row py-2">
                        <span className="text-white">
                            {hasFavorite ? "Favorite Contacts:" : ""}
                        </span>
                        <FavoriteContacts 
                            contacts={favorites}/>
                    </div>
                    <div className="row py-2">
                        <span className="text-white">
                            {hasGeneral ? "General Contacts:" : ""}
                        </span>
                        <GeneralContacts 
                            contacts={generals}/>
                    </div>
                </div>
                <Footer/>
            </div>

        )
    }
}
export default ContactIndex;