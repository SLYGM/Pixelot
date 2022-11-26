export type EntityComponent = {
  component_name: string;
  value: object;
};

export type Entity = {
  name: string;
  components: EntityComponent[];
};

export type Scene = {
  name: string;
  entities: Entity[];
};
