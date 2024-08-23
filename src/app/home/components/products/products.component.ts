import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../models/product';
import { FormGroup } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { storeInterface } from '../../../store/store';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  successMessage = new BehaviorSubject<string>('Log In Successfully');
  errormessage = new BehaviorSubject<string>('');
  cartNum:any;
  products:Product[]= []
  skip : number = 0;
  limit:number =10
  numberOfPages:number = 0;
  total:number = 0;
  numbers:number[] = new Array(20)
  activePage: number =1;
  form!: FormGroup;
  flag: boolean = false;
  productQuantity: any;
  success: boolean[] = [];
  productFlags: boolean[] = [];

constructor(private _product:ProductService, private store : Store<storeInterface>){
  this.store.subscribe(data => this._product.cartNum = data.counter.n)

  this.getAllProducts()
}

  getAllProducts()
  {
    this._product.getAllProductMain(10,this.skip).subscribe({
      next:(Response) => {
        this.products = Response.products
        this.numberOfPages = Math.ceil(Response.total / this.limit) ;
        this.total = Response.total
      }
    })
  }
  getSkipNum(skipNum:number)
  {
    this.skip = (skipNum - 1) * this.limit ; 
    this.activePage = skipNum; 
    this._product.getAllProductMain(this.limit,this.skip).subscribe({
      next:(Response) => {
        this.products = Response.products

        document.getElementById("paginate")?.classList.add("active")
       
        

      }
    })
  }
ngOnInit(): void {
  localStorage.setItem('currentPage','/Home/products');
  this.getAllProducts()
}
getProductByCat(cat : string) 
{
  this._product.getProductsByCategoryMain(cat).subscribe({
    next:(Response) =>{
      this.products = Response.products
      this.total = Response.total
    },
    error:(err) => {
      this.errormessage.next('Failed to add product to cart.');

    }
  })
}
onSubmit(event:any) {
  const selectedCategory = event?.target.value;
  if( selectedCategory === 'All') {
    this.getAllProducts();
    
  } 
  else
  {
    this.getProductByCat(selectedCategory)
  }
}

addToCart(product:any,index:number)
{
  this._product.addToCartMain(product,this.productQuantity).subscribe({
    next : (Response) =>
    {
      this.increase()
      this.success[index] = true;
    }
  })
}

increase()
{
  this.store.dispatch({type : 'increament'})


}

showQuantity(index: number) {
  this.productFlags[index] = true;
}

getQuantity(quantity:any)
{
  this.productQuantity = quantity.target.value
}
}
