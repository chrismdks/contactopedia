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
        const response = this.props.handleAddContact({name:name,email:email,phone:phone});
        
        if (response.status === "success") {
            this.setState({errorMsg:undefined,successMsg:response.msg})
            document.querySelector(".contact-form").reset();
        }
        else {
            this.setState({errorMsg:response.msg,successMsg:undefined})
        }
    }

    render() {
        return(
            <div className="border col-12 text-white p-2">
                <form onSubmit={this.handleAddContactFormSubmit} className="contact-form">
                    <div className="row p-2">
                        <div className="col-12 text-white-50">
                            Add a new Contact
                        </div>
                        <div className="col-12 col-md-4 p-1">
                            <input className="form-control form-control-sm" placeholder="*Name..." name="contactName"/>
                        </div>
                        <div className="col-12 col-md-4 p-1">
                            <input className="form-control form-control-sm" placeholder="Email..." name="contactEmail"/>
                        </div>
                        <div className="col-12 col-md-4 p-1">
                            <input className="form-control form-control-sm" placeholder="*Phone..." name="contactPhone"/>
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
                        <div className="col-12 col-md-6 offset-md-3 p-1">
                            <button className="btn btn-primary btn-sm form-control">Create</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
export default AddContact;