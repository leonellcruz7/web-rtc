import React, { useContext } from "react";
import { SocketContext } from "./SocketContext";

const VideoPlayer = () => {
  const {
    call,
    callAccepted,
    myVideo,
    userVideo,
    stream,
    name,
    setName,
    callEnded,
    me,
    callUser,
    leaveCall,
    answerCall,
  } = useContext(SocketContext);

  return (
    <div className="flex gap-2">
      {stream && (
        <div className="w-[500px] h-[500px] bg-slate-200">
          <p>{name || "Name"}</p>
          <video playsInline muted ref={myVideo} autoPlay></video>
        </div>
      )}

      {callAccepted && !callEnded && (
        <div className="w-[500px] h-[500px] bg-slate-200">
          <p>{call.name || "Name"}</p>
          <video playsInline ref={userVideo} autoPlay></video>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
