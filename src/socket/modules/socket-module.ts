import { UsersModule } from 'src/users/models/users.module';
import { Module } from "@nestjs/common";
import { SocketService } from "../services/socket-service";
import  { AppGateway } from "../socket-gateway"

@Module({
    providers: [AppGateway, SocketService]
})
export class SocketModule {}