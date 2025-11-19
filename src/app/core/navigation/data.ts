export interface NavigationSection {
  key: string;
  label: string;
  section: boolean;
  children: NavigationItem[];
}
export interface NavigationItem {
  key: string;
  label: string;
  icon?: string;
  route?: string;
  children?: NavigationItem[];
}

export const navigation: NavigationSection[] = [
  {
    key: 'withoutSection',
    label: '',
    section: false,
    children: [
      {
        key: 'dashboard',
        label: 'Dashboard',
        icon: 'esc_icons:dashboard',
        route: '/dashboard',
      },
    ],
  },
  {
    key: 'merchantCategoryCode',
    label: 'Merchant Category Code',
    section: true,
    children: [
      {
        key: 'sectors',
        label: 'Sectors',
        icon: 'esc_icons:sectors',
        route: '/sectors',
      },
      {
        key: 'mcc-limits',
        label: 'MCC Limits',
        icon: 'esc_icons:mcc-limits',
        route: '/mcc-limits',
      },
    ],
  },
  {
    key: 'currencies',
    label: 'Currencies',
    section: true,
    children: [
      {
        key: 'currencies',
        label: 'Currencies',
        icon: 'esc_icons:currencies',
        route: '/currencies',
      },
    ],
  },
  {
    key: 'pos-models',
    label: 'POS',
    section: true,
    children: [
      {
        key: 'pos-models',
        label: 'POS Models',
        icon: 'esc_icons:pos-models',
        route: '/pos-models',
      },
    ],
  },
  {
    key: 'general',
    label: 'General',
    section: true,
    children: [
      {
        key: 'banks',
        label: 'Banks & Branches',
        icon: 'esc_icons:banks',
        route: '/banks',
      },
      {
        key: 'os-versions',
        label: 'OS Versions',
        icon: 'esc_icons:os-versions',
        route: '/os-versions',
      },
      {
        key: 'services',
        label: 'Services',
        icon: 'esc_icons:services',
        route: '/services',
      },
    ],
  },
   
];
