import { Component } from '@angular/core';
import { TaskService } from '../app.module';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  tasks: any[] = [];

  constructor(private taskService: TaskService, private navCtrl: NavController) {}

  ionViewWillEnter() {
    this.tasks = this.taskService.getTasks();
  }

  deleteTask(index: number) {
    this.taskService.removeTask(index);
    this.tasks = this.taskService.getTasks();
  }

  markAsCompleted(index: number) {
    this.taskService.markTaskAsCompleted(index);
    this.tasks = this.taskService.getTasks();
  }

  navigateToAddTask() {
    this.navCtrl.navigateForward('/add-task');
  }

}
