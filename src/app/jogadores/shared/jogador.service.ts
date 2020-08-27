import { Injectable } from '@angular/core';
import { Jogador } from './jogador.model';
import { Bola } from './bola.model';
import { element } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class JogadorService {

  constructor() { }

  listarTodos():Jogador[]{
    let jogadores = localStorage['jogadores'];
    return jogadores ? JSON.parse(jogadores):[];
  }

  cadastrar(jogador:Jogador):void{
    const jogadores = this.listarTodos();
    jogador.id = new Date().getTime();
    jogadores.push(jogador);
    localStorage['jogadores'] = JSON.stringify(jogadores);
  }

  buscarPorId(id:number):Jogador{
    const jogadores = this.listarTodos();
    return jogadores.find(jogador=> jogador.id === id);
  }

  atualizar(jogador:Jogador):void{
    const jogadores:Jogador[] = this.listarTodos();
    jogadores.forEach((obj, index, objs) =>{
      if(jogador.id===obj.id){
        objs[index] = jogador;
      }
    });
    localStorage['jogadores'] = JSON.stringify(jogadores); 
  }

  remover(id:number):void{
    let jogadores: Jogador[] = this.listarTodos();
    jogadores = jogadores.filter(jogador=>jogador.id != id);
    localStorage['jogadores'] = JSON.stringify(jogadores); 
  }

  alterarStatus(id:Number):void{
    const jogadores:Jogador[] = this.listarTodos();
    jogadores.forEach((obj, index, objs) =>{
      if(id===obj.id){
        objs[index].inativo = !obj.inativo;
      }
    });
    localStorage['jogadores'] = JSON.stringify(jogadores); 
  }

  
  //--------------------------------------------------------------------------------

  shuffle(qtde:number){
    let jogadores: Jogador[] = this.listarTodos();
    jogadores = jogadores.filter(jogador=>jogador.inativo != true);
    jogadores = this.embaralhar(jogadores, qtde);
    localStorage['jogadoresShuffle'] = JSON.stringify(jogadores);
    //this.iniciarBolas();
  }

  embaralhar(jogadores:Jogador[], qtde:number):Jogador[]{
    for(let i = jogadores.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * i)
      const temp = jogadores[i]
      jogadores[i] = jogadores[j]
      jogadores[j] = temp
    }
    
    for(let i = 0; i < jogadores.length; i++){
      let jogador = jogadores[i];
      jogador.id = i+1;
      jogador.pontosRodada = 0;
      jogador.pontos = 0;
      jogador.pontosAcumulados = [];
      jogador.qtdeSaida = 0;
      jogador.pontosLimite = qtde;
      jogador.pontosFaltantes = qtde;
      jogadores[i] = jogador;
    }
    return jogadores;
  }

  listarTodosShuffle():Jogador[]{
    let jogadores = localStorage['jogadoresShuffle'];
    return jogadores ? JSON.parse(jogadores):[];
  }

  buscarPorIdShuffle(id:number):Jogador{
    const jogadores = this.listarTodosShuffle();
    return jogadores.find(jogador=> jogador.id === id);
  }

  removerShuffle(id:number):void{
    let jogadores: Jogador[] = this.listarTodosShuffle();
    jogadores = jogadores.filter(jogador=>jogador.id != id);
    localStorage['jogadoresShuffle'] = JSON.stringify(jogadores); 
  }


  qtdeJogadores():number{
    let jogadores = this.listarTodosShuffle();
    return jogadores.length;
  } 


  calcularPonto(jogadores:Jogador[]):boolean{
    let estourado = false;

    jogadores.forEach((jogador, index, objs) =>{
      jogador.pontos += jogador.pontosRodada * 1;
      jogador.pontosFaltantes =  (jogador.pontos >= jogador.pontosLimite) ? 0 : jogador.pontosLimite - jogador.pontos;
      jogador.pontosAcumulados.push(jogador.pontos);
      objs[index] = jogador;
      jogador.pontosRodada = 0;
      if(jogador.pontos > jogador.pontosLimite){
        estourado = true;
      }
    });
    localStorage['jogadoresShuffle'] = JSON.stringify(jogadores); 
    return estourado;
  }

  JogarNovamente(jogadores:Jogador[]):void{
    let maiorNumero = -1;
    
  
    jogadores.forEach((jogador, index, objs) => {
      if((jogador.pontos <= jogador.pontosLimite)&&(jogador.pontos > maiorNumero)){
        maiorNumero = jogador.pontos;
      }
    });

    jogadores.forEach((jogador, index, objs) =>{
      if(jogador.pontos > jogador.pontosLimite){
        jogador.pontos =  (maiorNumero * 1) + (maiorNumero >= jogador.pontosLimite? 0 : 1);
        jogador.pontosFaltantes = (jogador.pontos >= jogador.pontosLimite) ? 0 : jogador.pontosLimite - jogador.pontos;
        jogador.pontosAcumulados.push(jogador.pontos);
        jogador.qtdeSaida++;
        objs[index] = jogador;
        jogador.pontosRodada = 0;
      }
    });
    
    localStorage['jogadoresShuffle'] = JSON.stringify(jogadores); 
    
  }

  
  cadastrarSuffle(jogadores:Jogador[], jogador:Jogador):void{
    let maiorNumero = -1;
    let qtde = 100;
    
    jogadores.forEach((jogador, index, objs) => {
      if((jogador.pontos < jogador.pontosLimite)&&(jogador.pontos > maiorNumero)){
        maiorNumero = jogador.pontos;
      }
      qtde = jogador.pontosLimite;
    });
  
    jogador.id = this.qtdeJogadores() + 1;
    jogador.pontosRodada = 0;
    jogador.pontos = maiorNumero;
    jogador.pontosAcumulados = [];
    jogador.pontosFaltantes = qtde;
    if(maiorNumero > 0 ){
      jogador.pontos = maiorNumero +1;
      jogador.pontosFaltantes = (jogador.pontos >= qtde) ? 0 : qtde - jogador.pontos;
      jogador.pontosAcumulados.push(jogador.pontos);
    }
    jogador.qtdeSaida = 0;
    jogador.pontosLimite = qtde;
    
    jogadores.push(jogador);
    localStorage['jogadoresShuffle'] = JSON.stringify(jogadores); 
  }






  // pontuar(jogador:Jogador, valor:number, badPlay:boolean):void{
  //   let jogadores:Jogador[] = this.listarTodosShuffle();
  //   jogadores.forEach((obj, index, objs) =>{
  //     if(jogador.id===obj.id){
  //       jogador.pontos = jogador.pontos + ((badPlay)? valor * -1 : valor );
  //       jogador.bolasMatadas = jogador.bolasMatadas + " [ " + ((badPlay)? valor * -1 : valor) +" ] ";
  //       objs[index] = jogador;
  //     }
  //   });
  //   localStorage['jogadoresShuffle'] = JSON.stringify(jogadores); 
  //   this.inativarBola(valor,jogador);
  // }

  // desfazerPontuar(jogador:Jogador, valor:number, badPlay:boolean):void{
  //   let jogadores:Jogador[] = this.listarTodosShuffle();
  //   jogadores.forEach((obj, index, objs) =>{
  //     if(jogador.id===obj.id){
  //       jogador.pontos = jogador.pontos + ((badPlay)? valor : valor * -1 );
  //       let str = " [ " + ((badPlay)? valor * -1 : valor) +" ] ";
  //       jogador.bolasMatadas = jogador.bolasMatadas.replace(str,"");
  //       objs[index] = jogador;
  //     }
  //   });
  //   localStorage['jogadoresShuffle'] = JSON.stringify(jogadores); 
  //   this.desfazerInativarBola(valor);
  // }

  // punir(jogador:Jogador):void{
  //   let jogadores:Jogador[] = this.listarTodosShuffle();
  //   jogadores.forEach((obj, index, objs) =>{
  //     if(jogador.id===obj.id){
  //       jogador.pontos = jogador.pontos - 5;
  //       objs[index] = jogador;
  //     }
  //   });
  //   localStorage['jogadoresShuffle'] = JSON.stringify(jogadores); 
  // }


  // zerar(jogador:Jogador):void{
  //   let jogadores:Jogador[] = this.listarTodosShuffle();
  //   jogadores.forEach((obj, index, objs) =>{
  //     if(jogador.id===obj.id){
  //       jogador.pontos = 0;
  //       objs[index] = jogador;
  //     }
  //   });
  //   localStorage['jogadoresShuffle'] = JSON.stringify(jogadores); 
  // }


  //--------------------------------------------------------------------------------

  // iniciarBolas():void{

  //   let bolas = [
  //     new Bola(1,true, null),
  //     new Bola(2,true, null),
  //     new Bola(3,true, null),
  //     new Bola(4,true, null),
  //     new Bola(5,true, null),
  //     new Bola(6,true, null),
  //     new Bola(7,true, null),
  //     new Bola(8,true, null),
  //     new Bola(9,true, null),
  //     new Bola(10,true, null),
  //     new Bola(11,true, null),
  //     new Bola(12,true, null),
  //     new Bola(13,true, null),
  //     new Bola(14,true, null),
  //     new Bola(15,true, null)
  //   ];
  //   localStorage['bolas'] = JSON.stringify(bolas);
  // }


  // listarBolas():Bola[]{
  //   let bolas = localStorage['bolas'];
  //   return bolas ? JSON.parse(bolas):[];
  // }
  
  // listarJogadas(jogador:Jogador):Bola[]{
  //   let bolas = localStorage['bolas'];
  //   bolas = bolas.filter(bola=>bola.jogador === jogador);
  //   alert(bolas);
  //   return bolas ? JSON.parse(bolas):[];
  // }


  // inativarBola(valor:number, jogador:Jogador):void{
  //   const bolas:Bola[] = this.listarBolas();
  //   let bola:Bola = new Bola(valor,false,jogador);

  //   bolas.forEach((obj, index, objs) =>{
  //     if(obj.valor===valor){
  //       objs[index] = bola;
  //     }
  //   });
  //   localStorage['bolas'] = JSON.stringify(bolas); 
  // }

  // desfazerInativarBola(valor:number):void{
  //   const bolas:Bola[] = this.listarBolas();
  //   let bola:Bola = new Bola(valor,true,null);

  //   bolas.forEach((obj, index, objs) =>{
  //     if(obj.valor===valor){
  //       objs[index] = bola;
  //     }
  //   });
  //   localStorage['bolas'] = JSON.stringify(bolas); 
  // }

}
