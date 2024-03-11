import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private alertController: AlertController, public taskService: TaskService, public toastController: ToastController) {}

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Adicionar uma tarefa',
      subHeader: 'Descreva sua tarefa',
      inputs: [
      {
        name: 'task',
        type: 'text',
        placeholder: 'Inserir uma tarefa'
      },
      {
        name: 'date',
        type: 'date',
        min: '2024-03-01',
        max: '2025-12-31'
      }],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'

        },
        {
          text: 'Confirmar',
          handler: (alertData) => {
  
            if (alertData.task != "") {
  
              this.taskService.addTask(alertData.task, alertData.date)
  
            } else {
  
              this.presentToast();
              this.presentAlert();
  
            }
            console.log('Confirm Ok');
          }
        }
      ]
      
    });

    await alert.present();
  }

  async presentToast(){

    const toast = await this.toastController.create({

      message: "Preencha os campos",
      duration: 3000

    });
    toast.present();
  }

}
