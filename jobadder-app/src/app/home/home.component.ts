import { Component, OnInit } from '@angular/core';
import { job } from '../models/job';
import { candidate } from '../models/candidate';
import { HomeService } from './home.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private homeService: HomeService
  ) { }

  jobs: Array<job> = [];
  candidates: Array<candidate> = [];
  selectedJobId: number;
  matchedCandidates: Array<candidate> = [];
  selectedJob: job;
  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.homeService.getJobsAndCandidates().subscribe(responseList => {
      this.jobs = responseList[0] as job[];
      this.candidates = responseList[1] as candidate[];
      this.selectedJobId = this.jobs[0].jobId;
      this.findCandidates(this.selectedJobId);
    });
  }

  findCandidates(jobId) {
    this.matchedCandidates = [];
    this.selectedJob =  this.jobs.find(j => j.jobId === jobId);
    const jobSkills = this.selectedJob.skills.split(',');
    const that = this;
    Object.keys(this.candidates).forEach(function(index) {
      const candidateSkillTags = that.candidates[index].skillTags.split(',');
      const matchRatio = that.compare(jobSkills, candidateSkillTags);
      if (matchRatio > 0.1) {
        const matchedCandidate = that.candidates[index];
        matchedCandidate.matchRatio = matchRatio;
        that.matchedCandidates .push(matchedCandidate);
      }
    });

  }

  compareSkills(jobSkills: string, candidateSkillTags: string) {
    const jobSkillsArray = jobSkills.split(',');
    const candidateSkillTagsArray = candidateSkillTags.split(',');
    return this.compare(jobSkillsArray, candidateSkillTagsArray);
  }

  compare(jobSkills: string[], candidateSkillTags: string[]) {
    const matchedSkills = [];
    jobSkills = this.getUniqueSkillArray(jobSkills);
    candidateSkillTags = this.getUniqueSkillArray(candidateSkillTags);

    Object.keys(jobSkills).forEach(function (jobSkillIndex) {
      Object.keys(candidateSkillTags).forEach(function (candidateSkillTagIndex) {
        if (jobSkills[jobSkillIndex].toLowerCase() === candidateSkillTags[candidateSkillTagIndex].toLowerCase()) {
          matchedSkills.push(jobSkills[jobSkillIndex]);
        }
      });
    });

    return Math.round( 100 * matchedSkills.length / jobSkills.length) / 100;
  }

  showUniqueString(skills: string) {
    const skillArray = this.getUniqueSkillArray(skills.split(','));
    return skillArray.join(',');
  }

  getUniqueSkillArray(skills: string[]) {
    return  skills.filter((e, i) => skills.indexOf(e) >= i);
  }
}
