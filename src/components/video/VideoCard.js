import React from 'react';
import YouTube from 'react-youtube';

const VideoCard = ({ videoId, titulo }) => {
  const opts = {
    height: '180',
    width: '320',
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center p-4">
      {titulo && <h3 className="text-xl font-bold p-4">{titulo}</h3>}
      <YouTube videoId={videoId} opts={opts} />
    </div>
  );
}

export default VideoCard;