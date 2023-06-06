export interface testimonial {
  first_name: string;
  last_name: string;
  testimonial_id: number;
  testimonial_rating: number;
  testimonial_review: string;
  user_id: number;
}

export interface resource {
  title: string,
  link: string,
  resourceType: string,
  userId: number;
  first_name: string,
  last_name: string;
}