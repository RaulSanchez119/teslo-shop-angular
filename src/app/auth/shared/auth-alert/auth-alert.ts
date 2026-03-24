import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'auth-alert',
  imports: [],
  templateUrl: './auth-alert.html',
})
export class AuthAlert {

  message = input.required<string>();

}
