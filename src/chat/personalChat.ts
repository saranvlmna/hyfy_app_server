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
  handleConnection(socket: any) {
    console.log(`socketId ${socket.id}`);
    console.log(`userID ${socket.handshake.query.userId}`);
  }

  handleDisconnect(socket: any) {
    console.log(`socketId ${socket.id}`);
    console.log(`userID ${socket.handshake.query.userId}`);
  }

  @SubscribeMessage("sendMessage")
  async handleSendMessage(client: any, payload: any): Promise<void> {
    console.log(client.handshake.query.userId);
    console.log(payload);
    // this.server.to().emit('reciveMessage', payload);
  }
}
