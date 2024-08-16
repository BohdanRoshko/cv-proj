import { Tag } from "./Tag";

export class TagFilter {
    constructor(
      public tag: Tag,
      public checked: boolean = false
    ) {}
  }