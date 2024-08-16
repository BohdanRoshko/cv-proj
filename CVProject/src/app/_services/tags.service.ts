import { Injectable } from '@angular/core';
import { Tag } from '../_models/Tag';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  tags: Tag[] = [
    { key: 'Angular', color: 'red', isLanguage: false },
    { key: 'ASP.Net', color: 'burlywood', isLanguage: false },
    { key: 'Python', color: 'blue', isLanguage: true },
    { key: 'React', color: 'blue', isLanguage: false },
    { key: 'Typescript', color: 'blue', isLanguage: true },
    { key: 'Javascript', color: 'blue', isLanguage: true },
    { key: 'C#', color: 'blue', isLanguage: true },
    { key: 'Java', color: 'blue', isLanguage: true }
  ];

  constructor() { }

  getTagListing(): Tag[] {
    return this.tags;
  }

  getLanguageTags(): Tag[] {
    return this.tags.filter(tag => tag.isLanguage);
  }

  getFrameworkTags(): Tag[] {
    return this.tags.filter(tag => !tag.isLanguage);
  }
}
