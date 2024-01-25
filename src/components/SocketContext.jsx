import React, { createContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

export const SocketContext = createContext();
const socket = io("https://web-rtc-be.onrender.com/");

const ContextProvider = ({ children }) => {
  const [stream, setStream] = useState(null);
  const [me, setMe] = useState(null);
  const [call, setCall] = useState({});
  const [name, setName] = useState("");
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [loading, setLoading] = useState(true);
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  useEffect(() => {
    console.log("useEffect is running");

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);

        myVideo.current && (myVideo.current.srcObject = currentStream);
      });

    setMe(socket.id);
    // socket.on("me", (id) => {
    //   console.log("Received 'me' event. ID:", id);
    //   setMe(id);
    //   setLoading(false);
    // });

    socket.on("calluser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivedCall: true, from, name: callerName, signal });
    });
  }, [socket.id]);

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answercall", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current && (userVideo.current.srcObject = currentStream);
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };
  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("calluser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on("callaccepted", (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };
  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();
    window.location.reload();
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        callEnded,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        me,
        callUser,
        answerCall,
        leaveCall,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default ContextProvider;
