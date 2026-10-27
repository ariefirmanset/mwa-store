export interface ChildItem {
  id?: number | string;
  name?: string;
  icon?: any;
  children?: ChildItem[];
  item?: any;
  url?: any;
  color?: string;
}

export interface MenuItem {
  heading?: string;
  name?: string;
  icon?: any;
  id?: number;
  to?: string;
  items?: MenuItem[];
  children?: ChildItem[];
  url?: any;
}

import { uniqueId } from 'lodash';

const SidebarContent: MenuItem[] = [
  {
    heading: 'Dashboards',
    children: [
      {
        name: 'Dashboard1',
        icon: 'solar:atom-line-duotone',
        id: uniqueId(),
        url: '/',
      },
      {
        name: 'Dashboard2',
        icon: 'solar:chart-line-duotone',
        id: uniqueId(),
        url: '/dashboards/dashboard2',
      },
      {
        name: 'Dashboard3',
        icon: 'solar:screencast-2-line-duotone',
        id: uniqueId(),
        url: '/dashboards/dashboard3',
      },
      {
        name: 'Front Pages',
        id: uniqueId(),
        icon: 'solar:home-angle-linear',
        children: [
          {
            name: 'Homepage',
            id: uniqueId(),
            url: '/frontend-pages/homepage',
          },
          {
            name: 'About Us',
            id: uniqueId(),
            url: '/frontend-pages/aboutus',
          },
          {
            name: 'Blog',
            id: uniqueId(),
            url: '/frontend-pages/blog',
          },
          {
            name: 'Blog Details',
            id: uniqueId(),
            url: '/frontend-pages/blog/detail/streaming-video-way-before-it-was-cool-go-dark-tomorrow',
          },
          {
            name: 'Contact Us',
            id: uniqueId(),
            url: '/frontend-pages/contact',
          },
          {
            name: 'Portfolio',
            id: uniqueId(),
            url: '/frontend-pages/portfolio',
          },
          {
            name: 'Pricing',
            id: uniqueId(),
            url: '/frontend-pages/pricing',
          },
        ],
      },
      {
        name: 'Landingpage',
        icon: 'solar:bill-list-line-duotone',
        id: uniqueId(),
        url: '/landingpage',
      },
    ],
  },
  {
    heading: 'Apps',
    children: [
      {
        id: uniqueId(),
        name: 'Contacts',
        icon: 'solar:phone-line-duotone',
        url: '/apps/contacts',
      },
      {
        name: 'Ecommerce',
        id: uniqueId(),
        icon: 'solar:cart-3-line-duotone',
        children: [
          {
            id: uniqueId(),
            name: 'Shop',
            url: '/apps/ecommerce/shop',
          },
          {
            id: uniqueId(),
            name: 'Details',
            url: '/apps/ecommerce/detail/3',
          },
          {
            id: uniqueId(),
            name: 'List',
            url: '/apps/ecommerce/list',
          },
          {
            id: uniqueId(),
            name: 'Checkout',
            url: '/apps/ecommerce/checkout',
          },
          {
            id: uniqueId(),
            name: 'Add Product',
            url: '/apps/ecommerce/addproduct',
          },
          {
            id: uniqueId(),
            name: 'Edit Product',
            url: '/apps/ecommerce/editproduct',
          },
        ],
      },
    ],
  },
];

export default SidebarContent;
