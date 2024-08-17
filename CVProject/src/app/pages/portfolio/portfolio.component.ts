import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ProjectsService } from '../../_services/projects.service';
import { TagsService } from '../../_services/tags.service';
import { TagFilter } from '../../_models/TagFilter';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { SecretModalComponent } from '../components/secret-modal/secret-modal.component';
import { Project, Tag } from 'src/app/infrastructure/nswag/api';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit{
  public Tag = Tag; // Exposing Tag to the template
  bsModalRef? : BsModalRef;
  projects = {} as Project[];
  isCollapsed: boolean = true;

  public languageTags: TagFilter[] = [];
  public frameworkTags: TagFilter[] = [];
  public selectedTags: TagFilter[] = [];
  public filterText: string = '';  

  constructor(private titleService: Title,
     private projectService: ProjectsService,
     private tagService: TagsService,
     private modalService: BsModalService){
    this.titleService.setTitle("Bohdan Roshko - Portfolio")
  }

  async ngOnInit(): Promise<void> {
    this.projects = await firstValueFrom( this.projectService.GetProjectListing());
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
    if(this.filterText === "1488"){
      this.ShowSecret();
    }else{
      this.Filter();
    }
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

  async Filter(): Promise<void> {
    this.projects =  await this.projectService.GetFiltered(this.selectedTags, this.filterText) ;
  }
  ShowSecret(): void{
    const modalOptions: ModalOptions ={
      class: "modal-lg",
    };
    this.bsModalRef == this.modalService.show(SecretModalComponent,modalOptions);
  }

}
