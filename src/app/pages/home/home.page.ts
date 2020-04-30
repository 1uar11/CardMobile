import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

//import { MenuController } from '@ionic/angular';
import { RecorridoService } from '../../services/recorrido.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  recorrido:any = [];
  constructor(
    private authService:AuthService,
    private recorridoService:RecorridoService
    //private menuCtrl: MenuController
  ) {}

  ngOnInit(): void{
    this.showRecorrido();  
  }

/*   toggleMenu(){
     this.menuCtrl.toggle();
  } */

  logOut(){
    this.authService.logout();
  }

  showRecorrido(){
    this.recorridoService.readRecorrido().subscribe( recorrido => {
      this.recorrido = recorrido;
      
    })
  }

  addRecorrido(){
    this.recorridoService.addRecorridoAlert();
  }

}
