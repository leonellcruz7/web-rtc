import React, { useContext } from "react";
import { SocketContext } from "./SocketContext";

const Notifications = () => {
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
    <div>
      test
      {call.isReceivedCall && !callAccepted && (
        <div>
          <p>{call.name} is calling</p>
          <button onClick={answerCall}>accept</button>
        </div>
      )}
    </div>
  );
};

export default Notifications;
