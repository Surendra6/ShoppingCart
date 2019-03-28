import React, {Component} from 'react';
import Popup from "reactjs-popup";
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

class ProductTable extends Component {	
	constructor(props){
		super(props);
		this.state = {
			quantity: 1,
			dialogOpen: false
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e){
		this.setState({quantity: Number(e.target.value)});
	}
	handleClickOpen = () => {
		this.setState({ dialogOpen: true });
	};
	handleClose = () => {
		this.setState({ dialogOpen: false });
	};
	rows = [];

	ProductRow = (props) => {
		var ratingsClass; 
		
		if (props.product.ratings.avgRatings < 2.5)
			ratingsClass = "ratingsPoor";
		else if (props.product.ratings.avgRatings >= 2.5 && props.product.ratings.avgRatings < 3 )
			ratingsClass = "ratingsAvg";
		else
			ratingsClass = "ratingsHigh";

		return (			
			// <TableRow onClick={this.handleClickOpen}>
			// 	<TableCell><img className="productImage" src={require('../images/'+props.product.image)} alt="IMG" /></TableCell>
			// 	<TableCell>{props.product.name}</TableCell>
			// 	<TableCell className="productPrice">{'₹ '+props.product.price}</TableCell>
			// </TableRow>
			<Popup
				trigger={
					<TableRow>
						<TableCell><img className="productImage" src={require('../images/'+props.product.image)} alt="IMG" /></TableCell>
						<TableCell>{props.product.name}</TableCell>
						<TableCell className="productPrice">{'₹ '+props.product.price}</TableCell>
					</TableRow>
				}
				modal
				closeOnDocumentClick
			>
			{close => (
				<div className="pop_up_container">
				<a className="popup_close" onClick={close}>&times;</a>
					<h4 className="textCenter">{props.product.name}</h4>
					<img className="pop_up_Image" src={require('../images/'+props.product.image)} alt="IMG" />	
                    <div className="pop_up_item_details">
						<div className="alignRight productPrice">{'₹ '+props.product.price}</div>
						<div>
							<FormControl variant="outlined" className={props.formControl}>
								<InputLabel
									ref={ref => {
										this.InputLabelRef = ref;
									}}
									htmlFor="outlined-age-simple"
								>
									Quantity
								</InputLabel>
								<Select
									autoWidth={true}
									value={this.state.age}
									onChange={this.handleChange}
									input={
									<OutlinedInput
									autoWidth={true}
										name="age"
										id="outlined-age-simple"
									/>
									}
								>
									<MenuItem value=""><em>None</em></MenuItem>
									<MenuItem value={1}>1</MenuItem>
									<MenuItem value={2}>2</MenuItem>
									<MenuItem value={3}>3</MenuItem>
								</Select>
								</FormControl>
						</div>
						<div>
							<Button variant="extendedFab" color="primary" onClick={() => {props.onAddItemClicked(props.product, this.state.quantity)}}>Add to Cart &nbsp;<i className="fa fa-shopping-cart"></i></Button>
						</div>						
                    </div>
					<hr/>
					<div>
						<h5>Details</h5>
						<b>Model No </b>:<span> {props.product.modelNo}</span><br/>
						<b>User Ratings </b>({props.product.ratings.numofusers} users) :<span className={ratingsClass}> {props.product.ratings.avgRatings}</span>
					</div>
                </div>
				)}
			</Popup>
		);
	};

	TableBody = (props) => {
		this.rows.length= 0;
		props.products.forEach((product) => {
			if(props.inStockOnly && !product.stocked)
				return;

			if(product.name.toLowerCase().indexOf(props.filterText.toLowerCase()) === -1)
				return;

			if(product.category !== props.category && props.category !== "All")
				return;
			else if(props.category === "All"){
				this.rows.push(
					<this.ProductRow
						product={product}
						key={product.name}
						onAddItemClicked={props.onAddItemClicked}
					/>
				);
				return;
			}
			this.rows.push(
				<this.ProductRow
					product={product}
					key={product.name}
					onAddItemClicked={props.onAddItemClicked} 
				/>
			);
		});

		return (
			<TableBody>{this.rows}</TableBody>
		);
	};

	render() {
		return (
			<Paper>
				<Table className="productTable">
					<this.TableBody
						products={this.props.products} 
						filterText={this.props.filterText} 
						inStockOnly={this.props.inStockOnly} 
						category={this.props.category}
						onAddItemClicked={this.props.onAddItemClicked()}
					/>
				</Table>
				{/* <Dialog
					open={this.state.dialogOpen}
					onClose={this.handleClose}
					>
					<DialogTitle>Subscribe</DialogTitle>
					<DialogContent>
						<DialogContentText>
						To subscribe to this website, please enter your email address here. We will send
						updates occasionally.
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleClose} color="primary">
						Cancel
						</Button>
						<Button onClick={this.handleClose} color="primary">
						Subscribe
						</Button>
					</DialogActions>
				</Dialog> */}
			</Paper>				
		);
	}
}

export default ProductTable;