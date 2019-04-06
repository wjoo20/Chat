import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { GuardMensajesService } from './services/guard-mensajes.service';

// socket.io
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { 
  url: 'http://localhost:3700', 
  options: {} 
};

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { ChatComponent } from './components/chat/chat.component';
import { AppRoutingModule } from './app-routing.module';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';
import { MensajesComponent } from './components/mensajes/mensajes.component';
import { LoginComponent } from './components/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ChatComponent,
    ListaUsuariosComponent,
    MensajesComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
    AppRoutingModule,
    FormsModule
  ],
  providers: [GuardMensajesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
