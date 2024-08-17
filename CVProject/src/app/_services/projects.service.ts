import { Inject, Injectable, InjectionToken } from '@angular/core';
import { TagFilter } from '../_models/TagFilter';
import { Client, Project } from '../infrastructure/nswag/api';
import { HttpClient } from '@angular/common/http';
import { catchError, firstValueFrom, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private http: Client;

  // projects: Project[] = [
  //   {id: 0, name: "Sample Python Project", pictures: ["../../assets/image1.png","../../assets/image2.png","../../assets/image3.png"], projectLink: "//www.github.com", summary: "Python project that analyzes stock market data.", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", tags: [Tag.PYTHON]},
  //   {id: 1, name: "Sample Angular App", pictures: ["../../assets/image1.png","../../assets/image2.png","../../assets/image3.png"], projectLink: "//www.github.com", summary: "Fullstack web app developed using Angular and Node.JS", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", tags: [Tag.ANGULAR, Tag.TYPESCRIPT]},
  //   {id: 2, name: "Sample .Net App", pictures: ["../../assets/image1.png","../../assets/image2.png","../../assets/image3.png"], projectLink: "//www.github.com", summary: "Fullstack web app developed using React and ASP.NET", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", tags: [Tag.REACT ,Tag.CSHARP, Tag.ASPNET]},
  //   {id: 3, name: "Web API Project", pictures: ["../../assets/image1.png","../../assets/image2.png","../../assets/image3.png"], projectLink: "//www.github.com", summary: "Web API Project that was developed for a class project.", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", tags: [Tag.CSHARP, Tag.ASPNET]},
  //   {id: 4, name: "Chrome Extension", pictures: ["../../assets/image1.png","../../assets/image2.png","../../assets/image3.png"], projectLink: "//www.github.com", summary: "Developed a chrome extension that tracks the prices of furniture.", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", tags: [Tag.JAVASCRIPT]},
  //   {id: 5, name: "Mobile App", pictures: ["../../assets/image1.png","../../assets/image2.png","../../assets/image3.png"], projectLink: "//www.github.com", summary: "Mobile app developed in java that tracks the departure and arrival of trains.", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", tags: [Tag.JAVA]}
  // ];
  constructor(httpClient: HttpClient) { 
    this.http = new Client(httpClient,'https://localhost:7046')
  }

  Get(id: number): Observable<Project> {
    return this.http.getProject(id).pipe(
      catchError((error) => {
        console.error('Error fetching project:', error);
        return throwError(error);
      })
    );
  }

  GetProjectListing(): Observable<Project[]> {
    return this.http.getProjectListing().pipe(
      catchError((error) => {
        console.error('Error fetching project listing:', error);
        return throwError(error);
      })
    );
  }

  async GetFiltered(filterTags: TagFilter[], filterText: string): Promise<Project[]> {
    const selectedTags = filterTags.map(tf => tf.tag);
    
    const projects = await firstValueFrom(this.GetProjectListing()) ;
    
    return projects.filter(project => {
      const matchesTags = selectedTags.every(filterTag =>
        project.tags?.some(projectTag => projectTag.key === filterTag.key)
      );
      const filterTextLower = filterText.toLowerCase();
      const matchesText = project.name?.toLowerCase().includes(filterTextLower) || 
                          project.summary?.toLowerCase().includes(filterTextLower);
      return matchesTags && matchesText;
    });
  }
}
