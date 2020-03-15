import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NgForm} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  user:string;

  constructor(private router:Router) { }

  ngOnInit() {

  }

  search(forma:NgForm){
    console.log(forma);
    console.log("works")

  }

}
