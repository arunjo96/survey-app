
let ioInstance;

const initSocket = (io) => {
  ioInstance = io;

  io.on("connection", (socket) => {
    // console.log(" User connected:", socket.id);

    socket.on("disconnect", () => {
      // console.log(" User disconnected:", socket.id);
    });
  });
};


export const emitSurveyUpdate = () => {
  if (ioInstance) {
    ioInstance.emit("update-results");
  }
};

export default initSocket;



