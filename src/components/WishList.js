import React, { Component } from 'react';

class WishList extends Component {
    render() {
        return(
            <div className={this.props.className}>
                <h1>My Wish List</h1>
            </div>
        );
    }
}

export default WishList;