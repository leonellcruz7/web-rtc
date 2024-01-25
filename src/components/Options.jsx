import React, { useContext, useState } from "react";
import { SocketContext } from "./SocketContext";

const Options = ({ children }) => {
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

  const [idToCall, setIdToCall] = useState("");
  return (
    <div>
      <div className="flex gap-10">
        <div className="flex flex-col gap-2">
          <p>Account info</p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="name"
            type="text"
          />
          <button onClick={() => setIdToCall(me)}>copy id</button>
        </div>
        <div className="flex flex-col gap-2">
          <p>make a call</p>
          <input
            value={idToCall}
            onChange={(e) => setIdToCall(e.target.value)}
            type="text"
          />
          {callAccepted && !callEnded ? (
            <button onClick={leaveCall}>hang up</button>
          ) : (
            <button onClick={() => callUser(idToCall)}>call</button>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Options;
