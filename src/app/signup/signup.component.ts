import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { PasswordValidation } from './password-validator';
import { AlertService, UserService } from '../_services';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private userService: UserService,
      private alertService: AlertService) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
        username:['',Validators.required],
          name: ['', Validators.required],
          email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
          phone: ['', Validators.required],        
          password:['',Validators.compose([Validators.required,Validators.minLength(8)])],
          confirmPassword: ['',Validators.compose([Validators.required,Validators.minLength(8)])],
          address:['',Validators.compose([Validators.required,Validators.maxLength(30)])]
      }, {
        validator: PasswordValidation.MatchPassword
      });
      
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      this.loading = true;
      this.userService.register(this.registerForm.value)
          .pipe(first())
          .subscribe(
              data => {
                  this.alertService.success('Registration successful', true);
                  this.router.navigate(['/login']);
                  
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
  }
}
