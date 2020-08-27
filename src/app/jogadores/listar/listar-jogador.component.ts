import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { Jogador, JogadorService } from '../shared';


@Component({
  selector: 'app-listar-jogador',
  templateUrl: './listar-jogador.component.html',
  styleUrls: ['./listar-jogador.component.css']
})
export class ListarJogadorComponent implements OnInit {

  jogadores:Jogador[];
  num:number;

  constructor(private jogadorService:JogadorService, private router:Router) { }

  ngOnInit() {
    this.num = 100;
    this.jogadores = this.listarTodos();
    // this.jogadores = [
    //   new Jogador(1,"teste", true),
    //   new Jogador(1,"teste", false)
    // ];
  }

  listarTodos():Jogador[]{
    return this.jogadorService.listarTodos();
  }

  onClickSubmit(formData) {
    let qtde = 100;
    if (formData.qtde != ''){
      qtde =+formData.qtde;
    }
    this.shuffle(qtde>0?qtde:qtde*(-1));
  }

  shuffle(qtde:number):void{
    this.jogadorService.shuffle(qtde);
    this.router.navigate(["/jogadores/shuffle"]);
  }

  //$event - evento do broweser
  remover($event:any, jogador:Jogador):void{
    $event.preventDefault(); //desabilita a atualizacao da pagina
    if(confirm('Excluir o fera? '+ jogador.nome)){
      this.jogadorService.remover(jogador.id);
      this.jogadores = this.listarTodos();
    }
  }

  alterarStatus(jogador:Jogador):void{
    // if(confirm('Desabilitar o fera? '+ jogador.nome)){
      this.jogadorService.alterarStatus(jogador.id);
      this.jogadores = this.listarTodos();
    //}
  }

  

}
