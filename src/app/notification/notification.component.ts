import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-notification',
  imports: [],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
  constructor(private socket: Socket, private toastr: ToastrService) {}

  ngOnInit() {
    this.socket.on('project-updated', (msg: string) => {
      this.toastr.success(msg, 'Project Update');
    });
  }
}
