import React, { Component } from "react";

class LikeButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            liked: false
        };
    }

    _likedButton = async () => {
        this.setState({
            loading: true,
            liked: !this.state.liked
        });
        setTimeout(() => {
            // Http request
            this.setState({
                loading: false
            });
        }, 600);
    };

    render() {
        const { loading, liked } = this.state;
        return (
            <div>
                <p>Like button animation on HTTP request</p>
                <button onClick={ this._likedButton } disabled={ loading }>
                    <ion-icon name={ liked ? "heart" : "heart-empty" }/>
                </button>
            </div>
        );
    }
}

export default LikeButton;
