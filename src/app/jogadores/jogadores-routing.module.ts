import { Routes } from '@angular/router';

import {ListarJogadorComponent} from './listar';
import {CadastrarJogadorComponent} from './cadastrar';
import {EditarJogadorComponent} from './editar';
import {ShuffleJogadorComponent} from './shuffle';

export const JogadorRoutes:Routes = [
    {path:'jogadores', redirectTo:'jogadores/listar'},
    {path:'jogadores/listar', component: ListarJogadorComponent},
    {path:'jogadores/cadastrar', component: CadastrarJogadorComponent},
    {path:'jogadores/editar/:id', component: EditarJogadorComponent},
    {path:'jogadores/shuffle', component: ShuffleJogadorComponent},
    
];
