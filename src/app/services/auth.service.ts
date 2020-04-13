import { Injectable } from '@angular/core';
//creamos el metodo de autentificacion / se importa AngularFireAuth/inyectar al constructor 
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( 
    private Auth:AngularFireAuth,
    private Datebase:AngularFirestore,
    private router:Router
    
) { }

  isAunthenticated(){
    return this.Auth.auth.currentUser !== null;
  }

//creamos el metodo de logueo

  loginUserEmail(email:string, password:string){
    this.Auth.auth.signInWithEmailAndPassword(email, password).then(user => {
      console.log(user.user.email);
      this.router.navigate(['/home']);
    }).catch(err => console.log(err.message));
  }

  //Metodo para crear Usuario q recibe dos parametros Email Passwod
  createUserEmail(email:string, password:string, name:string, apellido:string){
    this.Auth.auth.createUserWithEmailAndPassword(email, password).then (user =>{
      console.log(user.user.uid);
      const uid = user.user.uid;
      this.Datebase.collection('users').doc(uid).set({
        iud:uid,
        name:name,
        apellido:apellido,
        email:email
      }).then(()=>{
        console.log("Usuario creado correctamente")
        this.router.navigate(['/home']);
      }).catch(err => console.log(err.message));
    }).catch(err => console.log(err.message));

  }

  //Metodo Salir

  logout(){
    this.Auth.auth.signOut().then(()=>{
      console.log("Esperamos verte pronto");
      this.router.navigate(['/login']);
    }).catch(err => console.log(err.message));
  }
}
