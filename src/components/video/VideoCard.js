import React from 'react';

const VideoCard = ({ src, titulo }) => {

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center p-4">
      {titulo && <h3 className="text-xl font-bold p-4">{titulo}</h3>}
      <video
        className="w-full h-32 sm:h-48 md:h-64 object-cover"
        controls
        src={src}
      />
    </div>
  );
}

export default VideoCard;