// add-task.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  @Input() employeeId: string = ''; 
  messageErr = '';

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (form.invalid) return;
  
    const taskData = {
      ...form.value,
      employeeId: this.employeeId 
    };
  
    console.log('Task data:', taskData); 
  
    this.taskService.addTask(taskData).subscribe(
      response => {
        console.log('Task added successfully', response);
        this.router.navigate(['/admin/employeetask', this.employeeId]); 
      },
      error => {
        console.error('Error adding task', error);
        this.messageErr = 'Failed to add task';
      }
    );
  }
  
}
