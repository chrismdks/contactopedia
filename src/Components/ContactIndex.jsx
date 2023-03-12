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
            {   id:1, isFavorite:false,
                name:"Chrisanthi Mihelioudakis", email:"chris.mdks@gmail.com", phone:"(+30)69XXXXXXXX"
            },
            {   id:2, isFavorite:true,
                name:"Ben Smith", email:"bensm@email.com", phone:"(+30)69XXXXXXXX"
            },
            {   id:3, isFavorite:true,
                name:"Kate Miller", email:"kmiller@email.com", phone:"(+30)69XXXXXXXX"
            }]
        }
    }

    handleAddContact = (newContact) => {
        //alert("Hello!");
        const indexOfLastElement = this.state.contactList.length - 1;
        const id = this.state.contactList[indexOfLastElement].id + 1;
        const newFinalContact = {
            id:id,
            isFavorite:false,
            name:newContact.name,
            email:newContact.email,
            phone:newContact.phone
        }
        this.setState((prevState)=>{
            return{
                contactList: prevState.contactList.concat([newFinalContact])
            }
        })
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
                        <div className="col-8 offset-2 row">
                            <AddContact handleAddContact = {this.handleAddContact} />
                        </div>
                    </div>
                    
                    <div className="row py-2">
                        <div className="col-8 offset-2 row">
                            <span className="text-white">
                                {hasFavorite ? "Favorite Contacts:" : ""}
                            </span>
                            <FavoriteContacts contacts={favorites}/>
                        </div>
                    </div>

                    <div className="row py-2">
                        <div className="col-8 offset-2 row">
                            <span className="text-white">
                                {hasGeneral ? "General Contacts:" : ""}
                            </span>
                            <GeneralContacts contacts={generals}/>
                        </div>
                    </div>
                </div>

                <Footer/>
            </div>

        )
    }
}
export default ContactIndex;