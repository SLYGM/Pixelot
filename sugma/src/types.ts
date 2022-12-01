export type EntityComponent = {
  component_name: string;
  args: object;
};

export type Entity = {
  name: string;
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
