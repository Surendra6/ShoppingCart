import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import FilterableProductTable from './FilterableProductTable';
import WishList from './WishList';
import Cart from './Cart';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    grow: {
      flexGrow: 1
    },
    homeButton: {
      marginLeft: -12,
      marginRight: 20
    },
    iconColor: {
        color: 'white',
        fontSize: '30px'
    },
    routesPosition:{
        marginTop: 70
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing.unit * 2,
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing.unit * 3,
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing.unit * 9,
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
      width: '100%',
    },
    inputInput: {
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 10,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 200,
      },
    }
});

class ShoppingCart extends Component {
    constructor(props) {
	    super(props);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.state = {
            filterText: ''
        };
	}
  
    handleFilterTextChange(e) {
		this.setState({
		  	filterText: e.target.value
		});
	}
      
    render() {
        const cartCount = this.props.cartItems.length;
        const { classes } = this.props;
        return (
            <BrowserRouter>
                <div>
                    <AppBar position="fixed">
                        <Toolbar>
                            <IconButton className={classes.homeButton}>
                                <Link to='/'><i className={"fa fa-home "+classes.iconColor}></i></Link>
                            </IconButton>
                            <Typography variant="h6" color="inherit" className={classes.grow}>
                                Shopping Cart
                            </Typography>
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    placeholder="Search…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    value = {this.state.filterText}
						            onChange = {this.handleFilterTextChange}
                                />
                            </div>
                            <IconButton >
                                <Link to='/wishList'><i className={"fa fa-heart "+classes.iconColor}></i></Link>
                            </IconButton>
                            <IconButton>
                                <Link to='/cart'>
                                    <Badge badgeContent={cartCount} color="secondary">
                                        <ShoppingCartIcon className={classes.iconColor}/>
                                    </Badge>
                                </Link>                                
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <Switch>
                        <Route exact path="/" 
                            render={() => {
                                return <FilterableProductTable 
                                    className={classes.routesPosition}
                                    products={this.props.products} 
                                    filterText={this.state.filterText}
                                />
                            }} 
                        />
                        <Route path='/wishList' render={() => <WishList className={classes.routesPosition}/>} />
                        <Route path='/cart' render={() => <Cart className={classes.routesPosition} products={this.props.products} />} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = state => {
    return {
        cartItems: state.cartItems
    }
}
export default compose(
    withStyles(styles, {
        name: 'ShoppingCart',
    }),
    connect(mapStateToProps),
)(ShoppingCart);