import { Routes } from '@angular/router';
import { PrincipalComponent } from './Pages/Principal/principal.component';
import { UsuarioComponent } from './Pages/Usuario/usuario.component';

export const routes: Routes = [
    { path: '', component:  PrincipalComponent},
    { path: 'usuario/:accion', component: UsuarioComponent },
    { path: 'usuario/:accion/:id/:nombre/:fechaNacimiento/:sexo', component: UsuarioComponent },
    { path: '**', component:  PrincipalComponent},
];
