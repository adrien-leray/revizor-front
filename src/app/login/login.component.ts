import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Logs } from '../shared/models/logs';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = null;

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      mail: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    const formValue: any = this.loginForm.value;
    const logs: Logs =  new Logs(formValue.mail, formValue.password);
    this.authService.login(logs);
  }

}
