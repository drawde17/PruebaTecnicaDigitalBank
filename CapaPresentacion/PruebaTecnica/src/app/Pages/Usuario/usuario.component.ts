import { Component } from '@angular/core';
import { Api } from '../../Servicios/Api.service';
import { RespuestaServicio } from '../../Interfaces/RespuestaServicio';
import { NgFor, NgIf, UpperCasePipe, formatDate } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../../Interfaces/Usuario';
import {
  MatDialog
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  standalone: true,
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css',
  imports: [
    FormsModule,
    NgIf,
    NgFor,
    UpperCasePipe,
    ReactiveFormsModule,
    MatButtonModule
  ],
})
export class UsuarioComponent {
  title = 'PruebaTecnica';
  encabezado: string = "";
  accion: string = "";

  usuario: Usuario = {
    IdUsuario: 0,
    Nombre: "",
    FechaNacimiento: null,
    Sexo: ""
  };
  erroresEstado: boolean = false;
  errores: string[] = [];

  usarioFormulario = new FormGroup({
    Nombre: new FormControl(''),
    FechaNacimiento: new FormControl(''),
    Sexo: new FormControl('')
  });
  
  constructor(
    private _api: Api,
    public dialog: MatDialog,
    private router: Router,
    private rutaActiva: ActivatedRoute,
    ){}

  ngOnInit() {
    this.accion = this.rutaActiva.snapshot.params["accion"]
    switch(this.rutaActiva.snapshot.params["accion"]){
      case "1":
          this.encabezado = "Adicionar Usuario"
        break;
      case "2":
          this.encabezado = "Modificar Usuario";
          this.usuario.IdUsuario = Number(this.rutaActiva.snapshot.params["id"]);
          this.poblarFormulario(this.rutaActiva.snapshot.params["nombre"], this.rutaActiva.snapshot.params["fechaNacimiento"], this.rutaActiva.snapshot.params["sexo"]);
        break;
      case "3":
          this.encabezado = "Eliminar Usuario"
          this.usuario.IdUsuario = Number(this.rutaActiva.snapshot.params["id"]);
          this.poblarFormulario(this.rutaActiva.snapshot.params["nombre"], this.rutaActiva.snapshot.params["fechaNacimiento"], this.rutaActiva.snapshot.params["sexo"]);
        break;
    }
  }

  /**
   * llena los campos en el formulario
   * @param nombre nombre del usuario
   * @param fechaNacimiento fecha de nacimiento
   * @param sexo Sexo
   */
  poblarFormulario(nombre: string, fechaNacimiento: string, sexo: string)
  {
    this.usarioFormulario.get('Nombre')?.setValue(nombre);
    this.usarioFormulario.get('FechaNacimiento')?.setValue(formatDate(fechaNacimiento, 'yyyy-MM-dd', 'en'));
    this.usarioFormulario.get('Sexo')?.setValue(sexo);
  }

  /**
   * Realiza una peticion que segun la accion puede ser adicionar, modificar o eliminar
   */
  enviarPeticion(){
    this.validarFormulario();
    if(!this.erroresEstado)
    {
      Swal.fire({
        title: "Desea continuar con la accion de "+ this.encabezado +" ?",
        showCancelButton: true,
        confirmButtonText: "Confirmar",
      }).then((result) => {
        if (result.isConfirmed) {
          switch(this.accion){
            case "1":
                this.adicionarUsuario();
              break;
            case "2":
                this.modificarUsuario();
              break;
            case "3":
                this.eliminarUsuario();
              break;
          }
        }
      });
    }
  }

  /**
  * realiza el consumo de adicionar usuario
  */
  private adicionarUsuario(){
    this.usuario.Nombre = this.usarioFormulario.get('Nombre')?.value;
    this.usuario.FechaNacimiento = this.usarioFormulario.get('FechaNacimiento')?.value
    this.usuario.Sexo = this.usarioFormulario.get('Sexo')?.value;
    this._api.AdicionarUsuario(this.usuario).subscribe((s: RespuestaServicio)=>{
      if(s.status){
        Swal.fire("Se ha adiccionado el usuario correctamente.", "", "success");
        this.Volver();
      }
      else{
        Swal.fire("Ha ocurrido un error, intente nuevamente.", "", "error")
      } 
    });
  }

  /**
  * realiza el consumo de modificar usuario
  */
  private modificarUsuario(){
    this.usuario.Nombre = this.usarioFormulario.get('Nombre')?.value;
    this.usuario.FechaNacimiento = this.usarioFormulario.get('FechaNacimiento')?.value
    this.usuario.Sexo = this.usarioFormulario.get('Sexo')?.value;
    this._api.ModificarUsuario(this.usuario).subscribe((s: RespuestaServicio)=>{
      if(s.status){
        Swal.fire("Se ha modificado el usuario correctamente.", "", "success");
        this.Volver();
      }
      else{
        Swal.fire("Ha ocurrido un error, intente nuevamente.", "", "error")
      } 
    });
  }

  /**
  * realiza el consumo de eliminar usuario
  */
  private eliminarUsuario(){
    this._api.EliminarUsuario(this.usuario.IdUsuario).subscribe((s: RespuestaServicio)=>{
      if(s.status){
        Swal.fire("Se ha eliminado el usuario correctamente.", "", "success");
        this.Volver();
      }
      else{
        Swal.fire("Ha ocurrido un error, intente nuevamente.", "", "error")
      } 
    });
  }

  /**
  * valida que los campos esten correctos
  */
  private validarFormulario()
  {
    this.errores = [];
    if(this.usarioFormulario.get('Nombre')?.value == "")
      this.errores.push("El campo nombre es requerido.");

    let longitudNombre : number | undefined = this.usarioFormulario.get('Nombre')?.value?.length;
    if(longitudNombre == undefined || longitudNombre == 0 || longitudNombre > 100)
      this.errores.push("El campo nombre no puede estar vacio o tener mas de 100 caracteres.");

    if(this.usarioFormulario.get('FechaNacimiento')?.value == "")
      this.errores.push("El campo Fecha de Nacimiento es requerido.");

    if(this.usarioFormulario.get('Sexo')?.value == "")
      this.errores.push("El campo Sexo es requerido.");

    let longitudSexo : number | undefined = this.usarioFormulario.get('Sexo')?.value?.length;
    if(longitudSexo == undefined || longitudSexo == 0 || longitudSexo > 1)
      this.errores.push("El campo Sexo no puede estar vacio o tener mas de 1 un caractere.");

    this.erroresEstado = this.errores.length > 0 ? true : false;
  }

  /**
   * navega al menu principal
   */
  Volver()
  {
    this.router.navigate(['/']);
  }
}
