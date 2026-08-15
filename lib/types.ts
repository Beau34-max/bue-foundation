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

export type VolunteerRole = {
  id: string;
  title: string;
  category: string;
  commitment: string;
  location: string;
  description: string;
  skills: string[];
  is_active: boolean;
  created_at: string;
};

export type TrainingProgramme = {
  id: string;
  title: string;
  category: string;
  duration: string;
  schedule: string;
  format: string;
  level: string;
  cost: string;
  next_start: string;
  description: string;
  outcomes: string[];
  registration_url: string | null;
  page_url: string | null;
  is_active: boolean;
  is_featured: boolean;
  sort_order: number;
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
