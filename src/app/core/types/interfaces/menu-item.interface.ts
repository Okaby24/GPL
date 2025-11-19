export interface MenuItem {
  key: string;
  label: string;
  icon?: string;
  link?: string;
  section?: boolean;
  queryParams?: { [key: string]: string };
  children?: MenuItem[];
}