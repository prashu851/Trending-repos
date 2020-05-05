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
    const filterLang = function(x){
      return x.language === selectedLanguage;
    }
    const mapLang = function(x){
      return x;
    }
    this.repos=this.resp.filter(filterLang).map(mapLang);
  };
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

