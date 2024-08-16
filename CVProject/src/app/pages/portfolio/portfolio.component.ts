import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Project } from '../../_models/Project';
import { ProjectsService } from '../../_services/projects.service';
import { Tag } from '../../_models/Tag';
import { TagsService } from '../../_services/tags.service';
import { TagFilter } from '../../_models/TagFilter';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit{
  public Tag = Tag; // Exposing Tag to the template
  
  projects = {} as Project[];
  isCollapsed: boolean = true;

  public languageTags: TagFilter[] = [];
  public frameworkTags: TagFilter[] = [];
  public selectedTags: TagFilter[] = [];
  public filterText: string = '';  

  constructor(private titleService: Title, private projectService: ProjectsService, private tagService: TagsService){
    this.titleService.setTitle("Bohdan Roshko - Portfolio")
  }

  ngOnInit(): void {
    this.projects = this.projectService.GetProjectListing();
    this.languageTags = this.tagService.getLanguageTags().map(tag => new TagFilter(tag));
    this.frameworkTags = this.tagService.getFrameworkTags().map(tag => new TagFilter(tag));
  }
  onCheckboxChange(event: Event, tagFilter: TagFilter): void {
    tagFilter.checked = (event.target as HTMLInputElement).checked;

    if (tagFilter.checked) {
      if (!this.selectedTags.includes(tagFilter)) {
        this.selectedTags.push(tagFilter);
      }
    } else {
      this.selectedTags = this.selectedTags.filter(tf => tf !== tagFilter);
    }

    this.Filter();
  }
  onFilterTextChange(): void {
    this.Filter();
  }
  clearFilterText(): void {
    this.filterText = '';
    this.Filter();
  }
  ResetFilters(): void {
    this.selectedTags = [];
    this.filterText = '';
    this.languageTags.forEach(tagFilter => tagFilter.checked = false);
    this.frameworkTags.forEach(tagFilter => tagFilter.checked = false);
    this.Filter();
  }

  Filter(): void {
    this.projects = this.projectService.GetFiltered(this.selectedTags, this.filterText);
  }
}
