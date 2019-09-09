import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from "rxjs";
import { forkJoin } from 'rxjs';
import { job } from '../models/job';
import { candidate } from '../models/candidate';
@Injectable()
export class HomeService {
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  jobCollectionApiUrl = 'http://private-76432-jobadder1.apiary-mock.com/jobs';
  candidateCollectionApiUrl =  'http://private-76432-jobadder1.apiary-mock.com/candidates';
  constructor(private http: HttpClient) { }

  public getJobs(): Promise<job[]> {
    return this.http.get<job[]>(this.jobCollectionApiUrl, this.httpOptions).toPromise();
  }

  public getCandidates(): Promise<candidate[]> {
    return this.http.get<candidate[]>(this.candidateCollectionApiUrl, this.httpOptions).toPromise();
  }

  public getJobsAndCandidates(): Observable<any[]> {
    let jobResponse = this.http.get(this.jobCollectionApiUrl);
    let candidateResponse = this.http.get(this.candidateCollectionApiUrl);
    return forkJoin([jobResponse, candidateResponse]);
  }
}
