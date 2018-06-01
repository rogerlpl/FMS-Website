import React from 'react';
import { Player, BigPlayButton,ControlBar } from 'video-react';
import video from '../../../assets/video/video.mp4'
export default (props) => {
    return (
        <Player
        fluid={true}
        height={417}
        width={395}
         src={video}
        >
            <ControlBar autoHide={false} />
            <BigPlayButton position="center" />
        </Player>
    );
};
