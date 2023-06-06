export interface job {
  jobId: number;
  title: string;
  company: string;
  dateApplied: string;
  link: string;
  location: string;
  status: string;
}


export interface testimonial {
  first_name: string;
  last_name: string;
  testimonial_id: number;
  testimonial_rating: number;
  testimonial_review: string;
  user_id: number;
}

export interface resource {
  resourceId: number;
  title: string;
  link: string;
  resourceType: string;
  userId: number;
  first_name: string;
  last_name: string;
}

export interface chart {
  jobs: any;
  reduceData: any;
  dataField: string;
  title: string;
}


