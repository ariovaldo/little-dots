import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';

import {JogadorService, Jogador, Bola} from '../shared';

@Component({
  selector: 'app-shuffle-jogador',
  templateUrl: './shuffle-jogador.component.html',
  styleUrls: ['./shuffle-jogador.component.css']
})
export class ShuffleJogadorComponent implements OnInit {

  jogadores:Jogador[];
  jogador:Jogador;
  mensagem:string;
  estourado:boolean;
  addJogador:boolean;

  constructor(private jogadorService:JogadorService, private router:Router) { }

  //referencia do formulario
  @ViewChild("formJogador", { static: true }) formJogador: NgForm;

  ngOnInit() {
    this.jogadores = this.listarTodosShuffle();
    this.mensagem = "";
    this.estourado = false;
    this.addJogador = false;
    this.jogador = new Jogador(); // inicializa o obj
  }

  listarTodosShuffle():Jogador[]{
    return this.jogadorService.listarTodosShuffle();
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  voltar():void{
    if(confirm('Tem certeza que deseja cancelar o jogo?')){
      this.router.navigate(["/jogadores/listar"]);
    }
  }

  calcularPontos(){
    if(this.ValidaCalcular()){
      this.estourado = this.jogadorService.calcularPonto(this.jogadores);
      return this.jogadorService.listarTodosShuffle();
    }
  }

  ValidaCalcular():boolean{
     let numGanhadores = 0;
     let numNegativo = 0;
     this.mensagem = "";

     this.jogadores.forEach(element => {
       if(element.pontosRodada<0){
        numNegativo++;
       }
       if(element.pontosRodada == 0){
        numGanhadores++;
       }
     });

     if(numNegativo>0){
      this.mensagem = "Não pode haver pontuação negativa!";
      return false;
     }

     if(numGanhadores == 0){
      this.mensagem = "Pelo menos um jogador deve bater!";
      return false;
     }else if(numGanhadores > 1){
      this.mensagem = "Somente um jogador deve bater!";
      return false;
     }else{
      return true;
     }
  }

  JogarNovamente(){
    this.estourado=false;
    this.jogadorService.JogarNovamente(this.jogadores);
    return this.jogadorService.listarTodosShuffle();
  }

  //$event - evento do broweser
  remover($event:any, jogador:Jogador):void{
    $event.preventDefault(); //desabilita a atualizacao da pagina
    if(confirm('Excluir o jogador? '+ jogador.nome)){
      this.jogadorService.removerShuffle(jogador.id);
      this.jogadores = this.listarTodosShuffle();
    }
  }

  formAddJogador(){
    this.addJogador = !this.addJogador; 
  }


  adicionar($event:any, jogador:Jogador):void{
    $event.preventDefault(); //desabilita a atualizacao da pagina
      this.jogadorService.removerShuffle(jogador.id);
      this.jogadores = this.listarTodosShuffle();
  }

  cadastrarNovoJogador():void{
        this.jogadorService.cadastrarSuffle(this.jogadores, this.jogador);
        this.formAddJogador();
        this.jogadores = this.listarTodosShuffle();
  }
 
}
