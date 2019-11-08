import React from "react";
import Generate from './Generate'


const EditInvoice = (props) => {
    let id = props.match.params.id
    return (
        <Generate id={id} />
    )
}

export default EditInvoice;