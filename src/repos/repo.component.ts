import { Component, Injectable } from '@angular/core';
import { Repo } from './repo';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { uniq } from 'lodash'


@Component({
  selector: 'testing-root-place-3',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.css']
})
@Injectable()
export class RepoComponent {
  title = 'Trending Repos';
  resp=[];
  repos=[];
  languages=[];
  displayedColumns: string[] = ['name', 'author', 'description'];
  constructor(
    private httpClient: HttpClient
  ) {}
  filterLangRepos(abcd){
    let newRepos = [];
    this.resp.forEach(element => {
      if (element.language === abcd) {
        newRepos.push(element);
      }
    });
    this.repos = newRepos;
    console.log(abcd);
  }
  getMobiles() {
    this.httpClient.get("https://github-trending-api.now.sh/repositories?since=daily")
    .subscribe((resp: [Repo]) => {
      this.resp = resp;
      this.repos = resp;
      let languages = [];
      resp.forEach(element => {
        if (element.language != undefined) {
          languages.push(element.language);
        }
      });
      this.languages = uniq(languages);
      
    })
  }
}

