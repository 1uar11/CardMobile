import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { database } from 'firebase';
import { AlertController, IonDatetime } from '@ionic/angular';
import { Time } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class RecorridoService {

  constructor(
    private Database:AngularFirestore,
    public alertController: AlertController
  ) { }

  DBref = this.Database.collection('recorrido');

  createRecorrido( actividad:string,  costo:string, detalle:string, fecha:IonDatetime, tiempo:IonDatetime ){
    this.DBref.add({
      actividad:actividad,
      costo:costo,
      detalle:detalle,
      fecha:fecha,
      tiempo:tiempo
    }).then( () => {
      console.log("Recorrdio creado correctamente");    
    }).catch(err => console.log(err.message));
  }

  readRecorrido(){
    return this.DBref.snapshotChanges().pipe(map(recorridos => {
      return recorridos.map( recorrido => {
        const data = recorrido.payload.doc.data();    
        return data;  
      })
      
    }))
  }

  //components 

  async addRecorridoAlert() {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      inputs: [
        {
          name: 'actividadRecorrido',
          type: 'text',
          placeholder: 'Actividad'
        },

        {
          name: 'costoRecorrido',
          type: 'text',
          placeholder: 'Costo'
        },

        {
          name: 'detalleRecorrido',
          type: 'text',
          placeholder: 'Detalle'
        },

        // input date with min & max
        {
          name: 'fechaRecorrido',
          type: 'date',
          placeholder: 'Tiempo'
          /* min: '2017-03-01',
          max: '2018-01-12' */
        },
        {
          name: 'tiempoRecorrido',
          type: 'text',
          placeholder: 'Tiempo'
        },

      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (name) => {
            console.log(name.actividadRecorrido);
            
            this.createRecorrido(
                                  name.nameRecorrdo,
                                  name.costoRecorrido,
                                  name.detalleRecorrido,
                                  name.fechaRecorrido,
                                  name.tiempoRecorrido
                              );
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  } 
}
