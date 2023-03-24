import Contact from "./Contact";

const GeneralContacts = (props) => {
    return(
        <div>
            {props.contacts.map((contact,index)=>(
                <Contact 
                    contact={contact} 
                    key={index} 
                    favoriteClick = {props.favoriteClick} 
                    deleteClick = {props.deleteClick} 
                    updateClick = {props.updateClick}
                />
            ))}
        </div>
    )
}
export default GeneralContacts;