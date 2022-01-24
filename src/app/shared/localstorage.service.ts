import { Injectable } from '@angular/core'

@Injectable  ({
    providedIn:'root'
})



export class localStorageService{






    constructor(){}

    setLoc(key:string, data:any){
        try {
            localStorage.setItem(key,JSON.stringify(data))
        } catch (error) {
            console.log(error)
        }
    }




    getLoc(key:string){
        try {
            return JSON.parse(localStorage.getItem(key))
        } catch (error) {
            console.log(error)
        }
    }


    removeLoc(key:string){
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.log(error)
            
        }
    }


    clear():void{
        try {
            localStorage.clear();
        } catch (error) {
            console.log(error)
        }

    }


  
}