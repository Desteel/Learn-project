export type Product = {
  id: string;
  title: string;
  by: string;
  status: string;
  quantity: number;
  description: string;
  features: string[];
  contents: string[];
  brand: string | null;
  estimated: string | null;
  grades: Record<string, string | null>;
};

export type Products = Product[];
