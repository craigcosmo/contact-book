import React from "react";
import EmptyList from "../component/EmptyList";
// import List from "../component/List";	


class List extends React.Component{
	createItem(item, index) {
		return (
			<button key={ index }>
				{ item.firstName }
			</button>
		);
	}
	render(){ 
		return(
			<div class="row">
				{this.props.userList.map(this.createItem.bind(this))}
			</div>
		)
	}
}


export default class Home extends React.Component{
	constructor(){
		super();
		this.state = {
			items : []
		};
	}
	componentWillMount(){
		this.firebaseRef = new Firebase('https://sweltering-heat-7923.firebaseio.com/contact');
		this.firebaseRef.once("value", function (snapshot){
			const items = [];
			snapshot.forEach(function(data){
				const item = {
					id: data.val().id,
					firstName: data.val().firstName
				};
				items.push(item);
			}.bind(this));
			this.setState({
				items : items
			});
		}.bind(this));	
	}
	componentWillUnmount() {
		this.firebaseRef.off();
	}
	navigate () { 
		this.context.router.push('/create');
	}
	render(){ 
		return(
			<List userList={this.state.items} />
		)
	}
}





// {
// 	for(var i in this.props.userList){
// 		return {i}
// 	}
// }