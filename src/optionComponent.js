import React from 'react'
import './style.css'

class OptionComponent extends React.Component{
	constructor(props){
		super(props);		     
        this.saveItem = this.saveItem.bind(this);
	}
	saveItem(e){		
		if(e){			
			this.props.HandleChangeEvent(e.target.value);
		}
	}
	render(){
		var items = this.props.OptionItems.map(item=>
			{
				return (<option key={item.id} value={item.type}>{item.type}</option>)
			});
		
		return(
				<div className="header">
					<select className="inputElement" onChange={this.saveItem}>{items}</select>
				</div>
			);
	}
}

export default OptionComponent