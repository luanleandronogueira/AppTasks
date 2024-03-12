import { Component } from '@angular/core';
import { AlertController, PopoverController, ToastController } from '@ionic/angular';
import { TaskService } from '../services/task.service';
import { PopoverComponent } from '../popover/popover.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  type : string = "pending";

  constructor(private alertController: AlertController, 
              public taskService: TaskService, 
              public toastController: ToastController, 
              public popoverController: PopoverController) {}

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


  async presentAlertDelete(index: number) {
    const alert = await this.alertController.create({
      header: 'Excluir tarefa',
      subHeader: 'Deseja excluir essa tarefa?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'

        },
        {
          text: 'Excluir',
          handler: () => {
            
            this.taskService.delTask(index);
           
          }
        }
      ]
      
    });

    await alert.present();
  }

  async presentAlertUpdate(index: number, task: any) {
    const alert = await this.alertController.create({
      header: 'Atualizar essa tarefa',
      subHeader: 'Descreva sua tarefa',
      inputs: [
      {
        name: 'task',
        type: 'text',
        placeholder: 'Inserir uma tarefa',
        value: task.value
      },
      {
        name: 'date',
        type: 'date',
        min: '2024-03-01',
        max: '2025-12-31',
        value: task.date.getFullYear() + "-" + 
       ((task.date.getMonth()+1) < 10 ? "0" + (task.date.getMonth()+1) : (task.date.getMonth()+1)) + "-" + 
       (task.date.getDate() < 10 ? "0" + task.date.getDate() : task.date.getDate())

      }
    ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'

        },
        {
          text: 'Confirmar',
          handler: (alertData) => {
  
            if (alertData.task != "") {
  
              this.taskService.updateTask(index, alertData.task, alertData.date)
  
            } else {
  
              this.presentToast();
              this.taskService.updateTask(index, alertData.task, alertData.date)
  
            }
            console.log('Confirm Ok');
          }
        }
      ]
      
    });

    await alert.present();
  }

  async presentPopover(e: Event) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: e,
    });

    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log(`Popover dismissed with role: ${role}`);

  }
}
