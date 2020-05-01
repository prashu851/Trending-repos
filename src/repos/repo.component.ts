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
  filterLangRepos(selectedLanguage){
    let newRepos = [];
    this.resp.forEach(element => {
      if (element.language === selectedLanguage) {
        newRepos.push(element);
      }
    });
    this.repos = newRepos;
  }
  getMobiles() {
    this.httpClient.get("https://github-trending-api.now.sh/repositories?since=daily")
    .subscribe((resp: [Repo]) => {
      this.resp = resp;
      this.repos = resp;

      const filterUndefined = function(x) {
        return x.language != undefined;
      }

      const mapToLanguage = function(x) {
        return x.language;
      };

      this.languages = uniq(resp.filter(filterUndefined).map(mapToLanguage));
    
    })
  }
}

