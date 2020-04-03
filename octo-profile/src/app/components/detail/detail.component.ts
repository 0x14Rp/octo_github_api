import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GithubService} from "../../services/github.service";
import {User} from "../../models/user";
import {Chart} from 'chart.js'
import 'chartjs-plugin-colorschemes';
import {objectKeys} from "codelyzer/util/objectKeys";
import {log} from "util";
import {langColors} from "../../enums/langColors.enum";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  user: string;
  allUser: User;
  charUno = [];
  charDos = [];
  charTres = [];
  borderColorDona;
  backgroundDona;
  color: langColors;


  constructor(private router: ActivatedRoute, private service: GithubService) {
    this.router.params
      .subscribe(data => {
        this.user = data.user;

      })
  }

  ngOnInit() {
    this.getDetails(this.user)
    this.getRepos(this.user)
    this.getTopLanguages(this.user)
    this.getMostStared(this.user)
    this.starForLanguage(this.user)

  }

  getDetails(user) {
    this.service.getUser(user)
      .subscribe(resp => {
        this.allUser = resp;


      }, error => {
        console.log(error);
      })

  }


  getRepos(user) {

/*
  all data here
*/
  }


  getTopLanguages(user) {
    this.service.getRepository(user)
      .subscribe(repos => {
        let res = repos.filter(res => !res.fork && res.language)
        let labels = res.map(t => t.language)
        const counts = labels.reduce((acc, value) => ({
          ...acc,
          [value]: (acc[value] || 0) + 1
        }), {});
        let data = (Object.values(counts));
        let testing = (Object.keys(counts));


        this.charUno = new Chart('langChart', {
          type: 'pie',
          data: {
            labels: testing,
            datasets: [
              {
                data: data,

                fill: false,


              },
            ]
          },
          options: {
            legend: {
              display: true,
              position: 'right',
            },
            plugins: {
              colorschemes: {

                scheme: 'brewer.Paired12',


              }
            }
          }
        })

      })

  }


  getMostStared(user) {

    this.service.getRepository(user)
      .subscribe(data => {
        const limit = 5;
        const sortProperty = 'stargazers_count';
        let res = data.filter(res => !res.fork && res.language)
          .sort((a, b) => b[sortProperty] - a[sortProperty])
          .slice(0, limit);
        let labels = res.map(t => t.name)
        let dataTwo = res.map(e => e[sortProperty])


        this.charDos = new Chart('starChart', {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              data: dataTwo,
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              fill: false,
              backgroundColor: [
                'rgba(255, 99, 132, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(153, 102, 255, 0.7)',
                'rgba(255, 159, 64, 0.7)',
              ],


              borderWidth: 1
            }]
          },
          options: {
            legend: {
              display: false

            },

            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true,
                }
              }]
            }
          }
        });
      })

  }

  starForLanguage(user) {
    this.service.getRepository(user)
      .subscribe(repos => {
        const filteredRepos = repos.filter(repo => !repo.fork && repo.stargazers_count > 0);
        const uniqueLangs = new Set(filteredRepos.map(repo => repo.language));
        const labels = Array.from(uniqueLangs.values()).filter(l => l);
        const data = labels.map(lang => {
          const repos = filteredRepos.filter(repo => repo.language === lang);
          const starsArr = repos.map(r => r.stargazers_count);
          const startSum = starsArr.reduce((a, b) => a + b, 0);
          this.borderColorDona = labels.map(label => langColors[label]);
          this.backgroundDona = this.borderColorDona.map(color => `${color}B3`);
          return startSum


        })
        this.charTres = new Chart('thirdChart', {
          type: 'doughnut',
          data: {
            labels: labels,
            datasets: [
              {
                data: data,
                borderColor: this.borderColorDona,
                fill: false,
                backgroundColor: this.backgroundDona,


              },
            ]
          },
          options: {
            legend: {
              display: true,
              position: 'right',
            },
          }
        })


        ;

      })


  }

}
