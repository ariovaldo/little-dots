import { Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';


import { JogadorService, Jogador } from '../shared';

@Component({
  selector: 'app-editar-jogador',
  templateUrl: './editar-jogador.component.html',
  styleUrls: ['./editar-jogador.component.css']
})
export class EditarJogadorComponent implements OnInit {

  jogador:Jogador;

  //referencia do formulario
  @ViewChild("formJogador", { static: true }) formJogador: NgForm;

  constructor(
    private jogadorService:JogadorService, 
    private router:Router, 
    private route:ActivatedRoute  
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.jogador = this.jogadorService.buscarPorId(id);
  }

  atualizar():void{
    if(this.formJogador.form.valid){
      this.jogadorService.atualizar(this.jogador);
      this.router.navigate(["/jogadores"]);
    }
  }

}
