import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { ProjectsService } from 'src/app/_services/projects.service';
import { Project } from 'src/app/infrastructure/nswag/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  featuredProject = {} as Project;

  constructor(private titleService: Title, private projectService: ProjectsService ){
    this.titleService.setTitle("Bohdan Roshko - Home")
  }
  async ngOnInit(): Promise<void> {
    this.featuredProject = await firstValueFrom(this.projectService.Get(0)); 
  }
}
