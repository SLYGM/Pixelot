export type EntityComponent = {
  component_name: string;
  args: string[];
};

export type Entity = {
  name: string;
  class: string;
  args: string[]
  components: EntityComponent[];
};

export class Scene {
  name: string;
  entities: Entity[];

  constructor(name: string) {
    this.name = name;
    this.entities = [];
  }
};
