export default interface Screen {
  name: string;
  component: React.ComponentType<any>;
  title?: string;
}
