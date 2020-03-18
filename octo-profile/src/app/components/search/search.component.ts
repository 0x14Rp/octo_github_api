import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {stringify} from "querystring";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  user: string;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  search(form) {

    let id = form;
    this.router.navigate(['/details', id.user]).then(e =>{
      if (e){
        console.log("good work")
      }else{
        console.log("bad work")
      }
    });
  }

}
