import React from 'react';
import { Player, BigPlayButton,ControlBar } from 'video-react';
import "./video-react.css"; // import css
export default (props) => {
    return (
        <Player
        fluid={false}
        height={815}
        width='auto'
        // src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
        >
            <ControlBar autoHide={false} />
            <BigPlayButton position="center" />
        </Player>
    );
};
