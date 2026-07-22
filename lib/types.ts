export type Job = {
  id: string;
  title: string;
  type: string;
  location: string;
  salary: string;
  department: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  desirable: string[];
  is_active: boolean;
  created_at: string;
};

export type BuefEvent = {
  id: string;
  title: string;
  type: string;
  date_label: string;
  time_label: string;
  location: string;
  description: string;
  speakers: string[];
  price: string;
  seats: string;
  tags: string[];
  is_active: boolean;
  sort_order: number;
  created_at: string;
};
