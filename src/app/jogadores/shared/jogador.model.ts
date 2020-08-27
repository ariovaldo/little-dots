export class Jogador{
    constructor(
        public id ?:number,
        public nome?:string,
        public inativo?:boolean,
        public pontosRodada?:number,
        public pontos?:number,  //ponto total
        public pontosFaltantes?:number,
        public pontosAcumulados?:number[],
        public pontosLimite?:number,
        public qtdeSaida?:number
    ){}
}
