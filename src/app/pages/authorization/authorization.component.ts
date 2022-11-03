import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { ROLE } from 'src/app/shared/constants/role.constant';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {

  public authForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private auth: Auth
  ) { }

  ngOnInit(): void {
    this.initAuthForm();
  }

  initAuthForm(): void {
    this.authForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
  }

  loginUser(): void {
    // this.accountService.login(this.authForm.value).subscribe(data => {
    //   if(data && data.length > 0) {
    //     const user = data[0];
    //     localStorage.setItem('currentUser', JSON.stringify(user))
    //     this.accountService.isUserLogin$.next(true);
    //     if(user && user.role === ROLE.USER) {
    //       this.router.navigate(['/cabinet']);
    //     } else if(user && user.role === ROLE.ADMIN){
    //       this.router.navigate(['/admin']);
    //     }
    //   }
    // }, (e) => {
    //   console.log(e);
    // })

    const {email, password} = this.authForm.value;
    this.login(email, password).then(() => {
      console.log('login done');
    }).catch(e => {
      console.log('login error', e)
    })
  }

  async login(email: string, password: string): Promise<void> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    console.log(credential);

  }

}
