import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RespuestaServicio } from "../Interfaces/RespuestaServicio";
import { Usuario } from "../Interfaces/Usuario";

@Injectable()
export class Api{
    private url:string = "https://localhost:7065";
    constructor(private http: HttpClient){}
    
    /**
     * Valida o genera token de autenticacion
     * @param callBack funcion que se puede ejecutar cuando ya se tiene respuesta
     */
    validarToken(callBack: any){
      if(localStorage.getItem('token') == null)
      {
        this.obtenerToken().subscribe((s: RespuestaServicio) => {
          if(s.status){
            console.log("tiene token");
            localStorage.setItem('token', s.data);
            callBack(); 
          }
        });
      }
      else
      {
        callBack();
      }
    }

    /**
     * consume servicio de generacion de token
     * @returns respuesta de servicio
     */
    obtenerToken() :Observable<RespuestaServicio>
    {
      return this.http.post<RespuestaServicio>(`${this.url}/Autenticacion/ObtenerToken`, null);
    }

    /**
     * consume servicio de consulta de usuarios
     * @returns respuesta de servicio
     */
    ConsultaUsuarios() :Observable<RespuestaServicio>
    {
      return this.http.get<RespuestaServicio>(`${this.url}/Usuario/Consultar`);
    }

    /**
     * consume servicio de adiccion de usuario
     * @returns respuesta de servicio
     */
    AdicionarUsuario(usuario: Usuario) :Observable<RespuestaServicio>
    {
      return this.http.post<RespuestaServicio>(`${this.url}/Usuario/Adicionar`, usuario);
    }

    /**
     * consume servicio de modificacion de usuario
     * @returns respuesta de servicio
     */
    ModificarUsuario(usuario: Usuario) :Observable<RespuestaServicio>
    {
      return this.http.put<RespuestaServicio>(`${this.url}/Usuario/Modificar`, usuario);
    }

    /**
     * consume servicio de eliminacion de usuario
     * @returns respuesta de servicio
     */
    EliminarUsuario(idUsuario: number) :Observable<RespuestaServicio>
    {
      return this.http.delete<RespuestaServicio>(`${this.url}/Usuario/Eliminar?id=${idUsuario}`);
    }
}