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
    render(){
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
                        <FavoriteContacts/>
                    </div>
                    <div className="row py-2">
                        <GeneralContacts/>
                    </div>
                </div>
                <Footer/>
            </div>

        )
    }
}
export default ContactIndex;