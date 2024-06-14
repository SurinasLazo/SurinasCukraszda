export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string; // "sütemény", "fagyi", "kimért sütemény"
  image: string;
  kiemelt: boolean;
}
