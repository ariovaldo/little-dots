import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {JogadorService, JogadorInativoDirective} from './shared';
import { ListarJogadorComponent } from './listar';
import { CadastrarJogadorComponent } from './cadastrar';
import { EditarJogadorComponent } from './editar';
import { ShuffleJogadorComponent } from './shuffle';




@NgModule({
  declarations: [
    ListarJogadorComponent, 
    CadastrarJogadorComponent, 
    EditarJogadorComponent, 
    JogadorInativoDirective,
    ShuffleJogadorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  providers:[
    JogadorService
  ]
})
export class JogadoresModule { }
