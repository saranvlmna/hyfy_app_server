import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { ChatService } from "./chat.service";
@WebSocketGateway({ cors: true })
export class personalChat {
  constructor(private chatService: ChatService) {}
  @WebSocketServer() server: any;

  async handleConnection(socket: any) {
    console.log(`socketId ${socket.id}`);
    console.log(`userID ${socket.handshake.headers.userid}`);
    return await this.chatService.onlineUser({
      userId: socket.handshake.headers.userid,
      socketId: socket.id,
    });
  }

  async handleDisconnect(socket: any) {
    console.log(`socketId ${socket.id}`);
    console.log(`userID ${socket.handshake.headers.userid}`);
    return await this.chatService.offlineUser({
      userId: socket.handshake.headers.userid,
      socketId: socket.id,
    });
  }

  @SubscribeMessage("sendMessage")
  async handleSendMessage(socket: any, payload: any): Promise<void> {
    console.log("userID", socket.handshake.headers.userid);
    console.log(`toUserId ${socket.handshake.headers.touserid}`);
    console.log("message", payload);
    let isOnliUser = await this.chatService.checkUserOnline(
      socket.handshake.headers.touserid
    );
    if (!isOnliUser) {
      await this.chatService.saveMessage({
        senderId: socket.handshake.headers.userid,
        reciverId: socket.handshake.headers.touserid,
        message: payload,
      });
      return;
    }
    await this.chatService.saveMessage({
      senderId: socket.handshake.headers.userid,
      reciverId: socket.handshake.headers.touserid,
      message: payload,
      sendTime: new Date(),
      isSend: true,
    });
    return this.server.to(isOnliUser.socketId).emit("reciveMessage", payload);
  }
}
