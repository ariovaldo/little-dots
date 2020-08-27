import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

import { JogadorService, Jogador } from '../shared';

@Component({
  selector: 'app-cadastrar-jogador',
  templateUrl: './cadastrar-jogador.component.html',
  styleUrls: ['./cadastrar-jogador.component.css']
})
export class CadastrarJogadorComponent implements OnInit {

  jogador:Jogador;

  //referencia do formulario
  @ViewChild("formJogador", { static: true }) formJogador: NgForm;

  constructor(private jogadorService:JogadorService, private router:Router)  { }

  ngOnInit() {
    this.jogador = new Jogador(); // inicializa o obj
  }

  cadastrar():void{
    if(this.formJogador.valid){
        this.jogadorService.cadastrar(this.jogador);
        this.router.navigate(["/jogadores"]);
    }
  }

}
