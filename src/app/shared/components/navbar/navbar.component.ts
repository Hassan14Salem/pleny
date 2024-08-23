import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../home/services/product.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isLoggin: boolean= false;
  cartNum: any;
  constructor(private _AuthService:AuthService, public _productService:ProductService,
    @Inject(PLATFORM_ID) private platformId: Object

  )
  { 
    if (isPlatformBrowser(this.platformId)) {
      this.cartNum = JSON.parse(localStorage.getItem('cartNum')!) || 0;

    }
  }

  logout()
  {
    this._AuthService.logOutMain();
  }
  isAuth()
  {
    this._AuthService.userInfo.subscribe(()=>{
      if ( this._AuthService.userInfo.getValue() != null   ){
        this.isLoggin = true; 
      } else
      {
        this.isLoggin = false; 
      }
     })
  }

    ngOnInit(): void {
      this.isAuth()
      if (isPlatformBrowser(this.platformId)) {
        this.cartNum = JSON.parse(localStorage.getItem('cartNum')!) || 0;
  
      }

       this.getCartNum()
      }

      getCartNum()
      {
        this._productService.getAllCart().subscribe({
          next:(Response) => {
            console.log(Response)
            this._productService.cartNum = Response.total;
          }
        })
      }
}
