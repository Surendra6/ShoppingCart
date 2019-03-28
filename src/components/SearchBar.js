import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
	button: {
	  display: 'block',
	  marginTop: theme.spacing.unit * 2,
	},
	formControl: {
	  margin: theme.spacing.unit,
	  minWidth: '99%',
	},
	toggleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
});

class SearchBar extends Component {
	componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
  }
	constructor(props) {
	    super(props);
	    this.handleInStockChange = this.handleInStockChange.bind(this);
			this.handleCategoryChange = this.handleCategoryChange.bind(this);
			this.state = {
				category: '',
				open: false,
				inStockOnly: false
			};
	}
  
  	handleInStockChange(e) {
			this.setState({
				inStockOnly: !this.state.inStockOnly
			});
			this.props.onInStockChange(!this.state.inStockOnly);
  	}

  	handleCategoryChange(e) {
			this.props.onCategoryChange(e.target.value);
			this.setState({ [e.target.name]: e.target.value });
		}
		handleClose = () => {
			this.setState({ open: false });
		}

		handleOpen = () => {
			this.setState({ open: true });
		}

	render() {
		const { classes } = this.props;
		const products = this.props.products;
		let categories = [];
		let options = [];
		products.forEach((product)=>{
			if(categories.indexOf(product.category) === -1)
				categories.push(product.category);
			
			return categories;	
		});

		categories.unshift("All");

		options = categories.map((category)=>{
			return(
				<MenuItem key={category} value={category}>{category}</MenuItem>
			);
		});

		return (
			<form>
				<FormControl variant="outlined" className={classes.formControl}>
					<InputLabel
						ref={ref => {
							this.InputLabelRef = ref;
						}}
					>
						Category
					</InputLabel>
					<Select						
						open={this.state.open}
						onClose={this.handleClose}
						onOpen={this.handleOpen}
						value={this.state.category}
						onChange={this.handleCategoryChange}
						input={
							<OutlinedInput
								labelWidth={this.state.labelWidth}
							  	name="category"
							/>
						}
					>
						{options}
					</Select>
				</FormControl>
				<FormControl className={classes.formControl}>
					<div className={classes.toggleContainer}>
							<IconButton onClick={this.handleInStockChange}>
								{this.state.inStockOnly ? <i className={"fa fa-check-square-o"}></i>: <i className={"fa fa-square-o"}></i>}
							</IconButton>
							<Typography>
								In Stock
							</Typography>							
					</div>
				</FormControl>
			</form>
		);
	}
}

export default withStyles(styles)(SearchBar);