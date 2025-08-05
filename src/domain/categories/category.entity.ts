interface CategoryProps {
  name: string;
  description: string;
}

export class Category {
  id: string;
  name: string;
  description: string;

  constructor({ name, description }: CategoryProps) {
    this.name = name;
    this.description = description;
  }
}