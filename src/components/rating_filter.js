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
            <div style={{ position: 'absolute', top: '20px', right: '80px', zIndex: 1000, width: 100, height: 40 }}>
                <input
                    type="range"
                    min="0"
                    max="5"
                    value={this.state.rating}
                    step="1"
                    onChange={this.handleRatingChange}
                />
                <div><b>Rating: {this.state.rating}</b></div>
            </div>
        );
    }
}

export default RatingFilter;
