import { Jogador } from './jogador.model';

export class Bola{
     constructor(
          public valor?:number,
          public ativo?:boolean,
          public jogador?:Jogador
     ){}
}