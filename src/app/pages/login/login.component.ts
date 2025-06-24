declare var google: any;
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 

// @Component({
//   selector: 'app-login',
//   standalone:true,
//   imports: [
//     CommonModule
//   ],
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css'
// })
// export class LoginComponent implements OnInit {

//   ngOnInit(): void {
//       google.accounts.id.initialize({
//         client_id:'',
//         callback: (resp: any)=>{

//         }
//       });
//       google.account.id.renderButton(document.getElementById("google-btn"),{
//         theme: 'filled-blue',
//         size: 'large',
//         shape: 'rectangle',
//         width: 350
//       })
//   }

     


// }
 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class LoginComponent implements OnInit {
  private router=inject(Router);

  ngOnInit(): void {
    const interval = setInterval(() => {
      if (window.google && window.google.accounts) {
        clearInterval(interval);

        window.google.accounts.id.initialize({
          client_id: '509815455081-brvnu80b4f44l9nfd9kiap47u9gdu150.apps.googleusercontent.com',
          // callback: this.handleCredentialResponse.bind(this),
          callback: (resp: any)=> this.handleLogin(resp)
        });

        window.google.accounts.id.renderButton(
          document.getElementById('google-signin-button'),
          {
            theme: 'outline',
            size: 'large',
          }
        );
      }
    }, 100);
  }

  handleCredentialResponse(response: any) {
    console.log('✅ ID Token:', response.credential);
    // Optional: call this.handleLogin(response); if needed
  }

  private decodeToken(token:string){
    return JSON.parse(atob(token.split(".")[1]));
  }

  handleLogin(response: any) {
    // You can decode token and manage user session here
     if(response){
      //decode the token
      const payload = this.decodeToken(response.credential);
      //store in session
      sessionStorage.setItem("loggedInUser",JSON.stringify(payload));
      //navigate to home/browse
      this.router.navigate(['browse'])
     }
  }
}
