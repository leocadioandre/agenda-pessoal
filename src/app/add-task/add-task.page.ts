import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TaskService } from '../app.module';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.page.html',
  styleUrls: ['./add-task.page.scss'],
})
export class AddTaskPage {

  taskTitle: string = '';
  taskDescription: string = '';
  dateDue: string = ''; // Variável para a data de conclusão
  availableDates: string[] = []; // Lista de datas disponíveis
  

  constructor(private taskService: TaskService, private navCtrl: NavController) {
    this.generateAvailableDates();
  }

  // Gera uma lista de datas a partir da data atual até 2 anos no futuro
  generateAvailableDates() {
    const today = new Date();
    const endYear = today.getFullYear() + 2;
    const currentDate = new Date(today);

    while (currentDate.getFullYear() <= endYear) {
      this.availableDates.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1); // Avança um dia
    }
  }

  addTask() {
    if (this.taskTitle.trim().length > 0) {
      this.taskService.addTask({ 
        title: this.taskTitle, 
        description: this.taskDescription, // Adiciona a descrição à tarefa
        dateDue: this.dateDue 
      });
      this.navCtrl.navigateBack('/home');
    }
  }

  cancel() {
    this.navCtrl.navigateBack('/home'); // Navega de volta para a página anterior
  }

}
