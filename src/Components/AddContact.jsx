import React from "react";

class AddContact extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            errorMsg: undefined,
            successMsg: undefined
        }
    }

    handleAddContactFormSubmit = (e) => {
        e.preventDefault();
        const name = e.target.elements.contactName.value.trim();
        const email = e.target.elements.contactEmail.value.trim();
        const phone = e.target.elements.contactPhone.value.trim();
        
        let response = undefined;
        if (this.props.isUpdating) {
            response = this.props.updateClick({
                id: this.props.selectedContact.id,
                name: name,
                email: email,
                phone: phone
            });
        }
        else {
            response = this.props.handleAddContact({
                name: name,
                email: email,
                phone: phone
            });
        }
        if (response.status === "success") {
            this.setState({errorMsg:undefined,successMsg:response.msg})
            document.querySelector(".contact-form").reset();
        }
        else {
            this.setState({errorMsg:response.msg,successMsg:undefined})
        }
    }

    cancelClick = () => {
        this.props.handleCancelUpdateContact();
    }

    render() {
        return(
            <div className="border col-12 text-white p-2">
                <form onSubmit={this.handleAddContactFormSubmit} className="contact-form">
                    <div className="row p-2">
                        <div className="col-12 text-white-50">
                            {this.props.isUpdating? "Update Contact" : "Add a new Contact"}
                        </div>
                        <div className="col-12 col-md-4 p-1">
                            <input className="form-control form-control-sm" 
                            placeholder="*Name..." 
                            name="contactName"
                            defaultValue={this.props.isUpdating? `${this.props.selectedContact.name}` : "" }/>
                        </div>
                        <div className="col-12 col-md-4 p-1">
                            <input className="form-control form-control-sm" 
                            placeholder="Email..." 
                            name="contactEmail"
                            defaultValue={this.props.isUpdating? `${this.props.selectedContact.email}` : "" }/>
                        </div>
                        <div className="col-12 col-md-4 p-1">
                            <input className="form-control form-control-sm" 
                            placeholder="*Phone..." 
                            name="contactPhone"
                            defaultValue={this.props.isUpdating? `${this.props.selectedContact.phone}` : "" }/>
                        </div>
                        {/*Conditional rendering - start*/}
                        {
                            this.state.successMsg === undefined ? 
                            (<div className="col-12 text-center text-danger">
                                {this.state.errorMsg}
                            </div> ) 
                            : 
                            (<div className="col-12 text-center text-success">
                                {this.state.successMsg}
                            </div> )
                        }
                        {/*Conditional rendering - end*/}
                        <div className={`col-12 p-1 ${this.props.isUpdating? "col-md-4 offset-md-2" : "col-md-6 offset-md-3"}`}>
                            <button className="btn btn-primary btn-sm form-control">
                                {this.props.isUpdating? "Update" : "Create"}
                            </button>
                        </div>
                        <div className={"col-12 p-1 col-md-4"}>
                            {this.props.isUpdating && (
                                <button className="btn btn-secondary btn-sm form-control"
                                onClick={()=>this.props.cancelClick()}>
                                    Cancel
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
export default AddContact;