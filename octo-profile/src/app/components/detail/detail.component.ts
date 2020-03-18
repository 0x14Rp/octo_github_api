import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GithubService} from "../../services/github.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  user: string;
  allUser: User;

  constructor(private router: ActivatedRoute, private service: GithubService) {
    this.router.params
      .subscribe(data => {
        this.user = data.user;
        this.getDetails(this.user)
      })
  }

  ngOnInit() {

  }


  getDetails(user) {
    this.service.getUser(user)
      .subscribe(resp => {
        this.allUser = resp;
        console.log(this.allUser);

      })

  }

}
