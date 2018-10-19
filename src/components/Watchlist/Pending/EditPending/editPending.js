import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {updatePendingTrigger,updatePendingQuantity} from '../../../../ducks/reducer';

class EditPending extends Component{
    constructor(){
        super()
        
        this.handleSubmitEdit=this.handleSubmitEdit.bind(this);
    }

handleSubmitEdit(id,price,qty){
        axios.put(`/api/editpending/${id}`,{price,qty})
    }

    render(){
        return(
            <div>
Edit Order
<form>
Quantity:
<input type="text" onChange={e=>this.props.updatePendingQuantity(e.target.value)}/>
<br/>
Edit Trigger Price:
<input type="text" onChange={e=>this.props.updatePendingTrigger(e.target.value)}/>
<br/>
{(this.props.pendingQuantity===0 && this.props.pendingTrigger===0)?(null):(this.props.pendingQuantity!==0 && this.props.pendingTrigger===0)?(<input type="submit" onClick={()=>this.handleSubmitEdit()}/>):('')
}
</form>
            </div>
        )
    }
}

function mapStateToProps(state){
    const {pendingQuantity,pendingTrigger} = state;
    return{
        pendingQuantity,pendingTrigger
    }
}

export default connect(
    mapStateToProps,{updatePendingTrigger,updatePendingQuantity}
)(EditPending);