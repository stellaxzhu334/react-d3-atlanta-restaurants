import React, { Component } from 'react';

class RatingFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 3, // Default rating
        };
    }

    handleRatingChange = (event) => {
        const selectedRating = event.target.value;
        this.setState({ rating: selectedRating });
        this.props.onRatingChange(selectedRating); // Call the parent handler 
    };

    render() {
        return (
            <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 1000 }}>
                <input
                    type="range"
                    min="1"
                    max="5"
                    value={this.state.rating}
                    step="1"
                    onChange={this.handleRatingChange}
                />
                <div>Rating: {this.state.rating}</div>
            </div>
        );
    }
}

export default RatingFilter;
