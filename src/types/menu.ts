export type MenuItem = {
  name: string;
  description: string;
  price: string;
};

export type MenuCategory = {
  title: string;
  icon: 'Utensils' | 'ChefHat' | 'Coffee' | 'Wine';
  items: MenuItem[];
};

export type MenuData = {
  [key: string]: MenuCategory;
};