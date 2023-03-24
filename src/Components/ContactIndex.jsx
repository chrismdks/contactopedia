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
            }],
            selectedContact: undefined,
            isUpdating: false
        }
    }

    validateNewContact = (newContact) => {
        // 1. Check if all are empty
        if (newContact.name==="" && newContact.phone==="" && newContact.email==="") 
            return {status:"failure",msg:"Please enter a contact"};
        // 1. Check if name is empty
        if (newContact.name==="") 
            return {status:"failure",msg:"Please enter a valid name"};
        // 2. Check if phone is empty
        if (newContact.phone==="")
            return {status:"failure",msg:"Please enter a valid phone number"};
        // 3. Check if contact already exists
        const isDuplicate = this.state.contactList.filter((x)=>{
            if(x.name.toLowerCase() === newContact.name.toLowerCase() && x.phone === newContact.phone) {
                return true;
            }
            return false;
        })
        // if (isDuplicate) {...} does not work because filter returns an array, not a value.
        if(isDuplicate.length > 0) return {status:"failure",msg:"Duplicate contact!"};
        
        return {status:"success",msg:"Contact validated!"};
    }

    handleAddContact = (newContact) => {
        const validationObj = this.validateNewContact(newContact);
        if (validationObj.status==="success") {
            let indexOfLastElement = (this.state.contactList.length - 1);
            let id = (indexOfLastElement === -1) ? 1 : this.state.contactList[indexOfLastElement].id + 1;
            const newFinalContact = {
                id:id,
                isFavorite:false,
                ...newContact
            }
            console.log(newFinalContact)
            this.setState((prevState)=>{
                return{
                    contactList: prevState.contactList.concat([newFinalContact])
                }
            })
            return {status:"success",msg:"Contact added successfully!"};
        }
        else return validationObj;
    }

    handleToggleFavorite = (contact) => {
        this.setState((prevState)=>{
            return{
                contactList: prevState.contactList.map((obj)=>{
                    if (obj.id===contact.id) 
                        return {...obj, isFavorite: !obj.isFavorite};
                    else return obj;
                })
            }
        })
    }

    handleDeleteContact = (contact) => {
        this.setState((prevState)=>{
            return{
                contactList: prevState.contactList.filter(
                    (obj) => (obj.id !== contact.id)
                )
            }
        })
    }

    /*Passing a new contact through an API*/
    handleAddRandomContact = (newContact) => {
        this.handleAddContact(newContact);
    }

    handleRemoveAll = () => {
        this.setState(()=>{
            return{
                contactList: []
            }
        })
    }

    handleUpdateContact = (contact) => {
        this.setState(()=>{
            return{
                selectedContact: contact,
                isUpdating: true
            }
        })
    }

    handleCancelUpdateContact = () => {
        this.setState(()=>{
            return{
                selectedContact: undefined,
                isUpdating: false
            }
        })
    }

    handleUpdateFinal = (selectedContact) => {
        this.setState((prevState)=>{
            return{
                contactList: prevState.contactList.map(obj=>{
                    if (obj.id===selectedContact.id) {
                        return {
                            ...obj,
                            name: selectedContact.name,
                            email: selectedContact.email,
                            phone: selectedContact.phone
                        };
                    }
                    return obj;
                }),
                isUpdating: false,
                selectedContact: undefined
            }
        })
        return {status:"success",msg:"Contact updated successfully!"};
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
                            <AddRandomContact handleAddRandomContact = {this.handleAddRandomContact}/>
                        </div>
                        <div className="col-4">
                            <RemoveAllContacts handleRemoveAll = {this.handleRemoveAll}/>
                        </div>
                    </div>

                    <div className="row py-2">
                        <div className="col-8 offset-2 row">
                            <AddContact 
                            selectedContact={this.state.selectedContact} 
                            isUpdating={this.state.isUpdating} 
                            handleAddContact = {this.handleAddContact}
                            cancelClick = {this.handleCancelUpdateContact}
                            updateClick = {this.handleUpdateFinal}/>
                        </div>
                    </div>
                    
                    <div className="row py-2">
                        <div className="col-8 offset-2 row">
                            <span className="text-white">
                                {hasFavorite ? "Favorite Contacts:" : ""}
                            </span>
                            <FavoriteContacts 
                                contacts={favorites} 
                                favoriteClick = {this.handleToggleFavorite}
                                deleteClick = {this.handleDeleteContact} 
                                updateClick = {this.handleUpdateContact}/>
                        </div>
                    </div>

                    <div className="row py-2">
                        <div className="col-8 offset-2 row">
                            <span className="text-white">
                                {hasGeneral ? "General Contacts:" : ""}
                            </span>
                            <GeneralContacts 
                                contacts={generals} 
                                favoriteClick = {this.handleToggleFavorite}
                                deleteClick = {this.handleDeleteContact} 
                                updateClick = {this.handleUpdateContact}/>
                        </div>
                    </div>
                </div>

                <Footer/>
            </div>

        )
    }
}
export default ContactIndex;