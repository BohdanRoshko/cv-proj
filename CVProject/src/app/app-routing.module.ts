import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { ResumeComponent } from './pages/resume/resume.component';


const routes: Routes = [
  
  { 
    path: 'home',
    component: HomeComponent,
  },
  { 
    path: 'portfolio',
    component: PortfolioComponent,
  },
  { 
    path: 'resume',
    component: ResumeComponent,
  },
  { 
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: '**',
    component: HomeComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
