import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  userId :any;
  cartNum : any;

  constructor(private http : HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { 
    if (isPlatformBrowser(this.platformId)) {
      this.userId = JSON.parse(localStorage.getItem('userId')!) || null;

    }
  }

  getAllProductMain(limit:number ,skip:number):Observable<any>
  {
    return this.http.get(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
  }

  getProductsByCategoryMain(category:string) : Observable<any>
  {
   return this.http.get(`https://dummyjson.com/products/category/${category}`)
  }

  addToCartMain(product:any,_quantity:any) :Observable<any>
  {
    const body = {
      userId :this.userId,
      products : [
        {
          id :product.id,
          quantity : _quantity
        }
      ]
      

    }
   return this.http.post('https://dummyjson.com/carts/add',body)
  }

  getAllCart() : Observable<any>
  {
    console.log(this.userId)
   return this.http.get(`https://dummyjson.com/carts/user/${this.userId}`)

  }

  
}
