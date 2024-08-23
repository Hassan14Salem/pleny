import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm! :FormGroup;
  test:boolean=false;
  successMessage =new BehaviorSubject<any>(null)
  errormessage =new BehaviorSubject<any>(null)


  constructor(private fb: FormBuilder ,private _auth:AuthService, private router:Router) {}

  ngOnInit(): void {

    localStorage.setItem('currentPage','/products');


    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  isAuth(): void {
    
    
    const { email, password } = this.loginForm.value;

    this._auth.loginTest(email, password).subscribe(
      {
        next : (Response) =>{
          console.log(Response)
          if(Response.token)
          {
            this.successMessage.next('tessssssssssst')
            this.router.navigate(['/Home/products'])
            localStorage.setItem('userToken' , Response.token )
            localStorage.setItem('userId', JSON.stringify(Response.id));
            this._auth.decodeToken();
          }
          console.log(Response.token)
        } , 
        error : (err) => {
          this.errormessage.next('Error In Log in , Please Try Again')
          console.log(err)

        }
      }
     );


     





  }
}
