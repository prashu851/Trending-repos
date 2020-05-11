import { Component, Injectable, OnInit } from '@angular/core';
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
export class RepoComponent{
  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getMobiles();
  }

  title = 'Trending Repos';
  resp=[];
  repos=[];
  languages=[];
  constructor(
    private httpClient: HttpClient
  ) {}
  filterLangRepos(selectedLanguage){
    let newRepos = [];
    const filterLang = function(x){
      return x.language === selectedLanguage;
    }

    this.repos=this.resp.filter(filterLang);
  };
  filterSearchRepos(userInput) {
    const inputValue = userInput.target.value;
    const filterSearchedInput = function(x) {
      return x.description.toLowerCase().includes(inputValue.toLowerCase());
    }

    this.repos=this.resp.filter(filterSearchedInput);
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

