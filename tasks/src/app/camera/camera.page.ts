import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri
      });

      // Aqui você pode processar a imagem retornada
      console.log('Imagem capturada:', image);
    } catch (error) {
      console.error('Erro ao capturar imagem:', error);
    }
  }

  async setName() {
    try {
      await Preferences.set({
        key: 'name',
        value: 'Max',
      });
      console.log('Nome definido como Max');
    } catch (error) {
      console.error('Erro ao definir o nome:', error);
    }
  }
}
