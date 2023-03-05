const Contact = (props) => {
    return(
        <div className="row p-nd-2 nb-2 mb-2" style={{borderRadius:"20px",border:"1px solid #555"}}>
            <div className="col-2 col-md-1 pt-2 pt-md-1">
                <img src={`https://ui-avatars.com/api/?name=${props.contact.name}`}
                style={{width:"80%"}} alt="ui-avatar"/>
            </div>
            <div className="col-6 col-md-5 text-warning pt-0">
                <span className="h4">{props.contact.name}</span>
                <br/>
                <div className="text-white-50">
                    {props.contact.email}
                    <br/>
                    {props.contact.phone}
                </div>
            </div>
            {/*Favorite & Unfavorite button*/}
            <div className="col-2 col-md-2 pt-md-3">
                <button className={`btn btn-sm m-1 ${
                    props.contact.isFavorite?"btn-warning":"btn-outline-warning"}`
                }>
                    <i class="bi bi-star" style={{fontSize:"1rem"}}></i>
                </button>
            </div>
            
            <div className="col-2 col-md-2 pt-md-3">
                {/*Edit-Contact button*/} 
                <button className={`btn btn-sm m-1 ${
                    props.contact.isFavorite?"btn-primary":"btn-outline-primary"}`
                }>
                    <i class="bi bi-pencil-square" style={{fontSize:"1rem"}}></i>
                </button>
                {/*Delete-Contact button*/}
                <button className={`btn btn-sm m-1 ${
                    props.contact.isFavorite?"btn-danger":"btn-outline-danger"}`
                }>
                    <i class="bi bi-trash3" style={{fontSize:"1rem"}}></i>
                </button>
            </div>
            
            <button className="btn btn-secondary form-control">
                Call {props.contact.name}
            </button>
        </div>
    )
}
export default Contact;