import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { IonicStorageModule } from '@ionic/storage-angular';

import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,IonicStorageModule.forRoot()],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasks: any[] = [];

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
    this.loadTasks();
  }

    // Recuperar as tarefas do Local Storage
  async loadTasks() {
    const storedTasks = await this.storage.get('tasks');
    this.tasks = storedTasks || [];
  }

  // Atualizar a lista de tarefas no Local Storage
  getTasks() {
    return this.tasks;
  }

  // Adicionar nova tarefa e salvar no Local Storage
  async addTask(task: any) {
    task.dateCreated = new Date().toISOString(); // Data de inclusão
    task.isCompleted = false; // Tarefa não concluída por padrão
    this.tasks.push(task);
    await this.storage.set('tasks', this.tasks);
  }

  async removeTask(index: number) {
    this.tasks.splice(index, 1);
    await this.storage.set('tasks', this.tasks);
  }

    // Marcar tarefa como concluída
  async markTaskAsCompleted(index: number) {
    this.tasks[index].isCompleted = true;
    await this.storage.set('tasks', this.tasks);
  }
}
