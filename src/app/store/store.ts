import { Action } from "@ngrx/store"

let cartNum ={
    n:0
}
export interface storeInterface 
{
    counter : counter
}
interface counter 
{
    n :number
}
export function counterReducer(state = cartNum , action : Action)
{
    switch(action.type)
    {
        case 'increament' :
            return {
                 n : state.n + 1
            }
        case 'decreament' :
            return {
                n : state.n - 1
           }
        default : 
        return state

    }
}