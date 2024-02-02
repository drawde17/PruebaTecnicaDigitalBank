import { Component } from '@angular/core';
import { Api } from '../../Servicios/Api.service';
import { RespuestaServicio } from '../../Interfaces/RespuestaServicio';
import { NgFor, NgIf, UpperCasePipe, formatDate } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../Interfaces/Usuario';

@Component({
  standalone: true,
  selector: 'app-principal',
  templateUrl: 'principal.component.html',
  styleUrl: './principal.component.css',
  imports: [
    FormsModule,
    NgIf,
    NgFor,
    UpperCasePipe,
  ],
})
export class PrincipalComponent {
  title = 'PruebaTecnica';
  usuariosTodos: Usuario[] | null = null;
  usuarios: Usuario[] | null = null;
  paginacionDatos: any = [{}];
  paginacion: number = 10;
  totalPaginas: number = 0;
  PaginaActual: number = 0;
  totalRegistros: number = 0;

  constructor(
    private router: Router,
    private _api: Api
    ){}

  ngOnInit() {
    this._api.validarToken(()=> this.ConsultaUsuarios());
  }
  /**
   * Obtiner informacion de consulta de usuarios
   */
  ConsultaUsuarios(){
    this._api.ConsultaUsuarios().subscribe((s: RespuestaServicio) => {
      if(s.status){
        this.usuariosTodos = s.data;
        this.inicioPaginacion(s.data.map((m: any) => ({ IdUsuario: m.idUsuario, Nombre: m.nombre, FechaNacimiento: m.fechaNacimiento, Sexo: m.sexo })));
      }
    });
  }

  /**
   * Inicializa la paginacion
   * @param datos informacion a paginar
   */
  inicioPaginacion(datos: any){
    if(datos != null && datos.length >= 1){
      this.totalPaginas = Math.ceil(datos.length / this.paginacion);
      this.totalPaginas = this.totalPaginas == 0 ? 1 : this.totalPaginas;
      this.PaginaActual = 1;
      this.totalRegistros = datos.length;
      for(let i = 1; i <= this.totalPaginas; i++) {
        this.paginacionDatos[i - 1] = { pagina: i, datos: datos.slice((i == 1 ? i - 1 : ((i - 1) * this.paginacion)) , this.paginacion * i) };
      }
      this.usuarios = this.paginacionDatos.find((f:any) => f.pagina == 1).datos;
    }
  }

  /**
   * Da formato a las fechas a visualizar
   * @param fechaNacimiento fecha a formatear
   * @returns fecha formateada
   */
  darFormatoFecha(fechaNacimiento: string | null | undefined): string{
    return formatDate(String(fechaNacimiento), 'yyyy-MM-dd', 'en');
  }

  /**
   * Redirecciona a la pagina de creacion de usuarios
   */
  AdcionarUsuario(){
    this.router.navigate(['/usuario/1']);
  }

  /**
   * Redirecciona a la pagina de modificacion de usuarios
   */
  ModificarUsuario(usuario: any){
    this.router.navigate([`/usuario/2/${usuario.IdUsuario}/${usuario.Nombre}/${usuario.FechaNacimiento}/${usuario.Sexo}`]);
  }

  /**
   * Redirecciona a la pagina de eliminacion de usuarios
   */
  EliminarUsuario(usuario: any){
    this.router.navigate([`/usuario/3/${usuario.IdUsuario}/${usuario.Nombre}/${usuario.FechaNacimiento}/${usuario.Sexo}`]);
  }

  /**
   * Cambia la pagina a visualizar
   */
  CambiarPagina(datosPaginados: any){
    this.PaginaActual = datosPaginados.pagina;
    this.usuarios = datosPaginados.datos;
  }

  /**
   * Genera archivo TXT
   */
  guardarArchivoDeTexto(){
    const a = document.createElement("a");
    const archivo = new Blob([JSON.stringify(this.usuariosTodos)], { type: 'text/plain' });
    const url = URL.createObjectURL(archivo);
    a.href = url;
    a.download = "Usuarios"+ Date.now();
    a.click();
    URL.revokeObjectURL(url);
  }
}
