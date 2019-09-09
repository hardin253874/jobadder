export class job {
  jobId: number;
  name: string;
  company: string;
  skills: string;
  constructor(
    fields?: {
      jobId?: number;
      name?: string;
      company?: string;
      skills?: string;
    }) {
    if (fields) Object.assign(this, fields);
  }
}
