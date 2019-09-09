export class candidate {
  candidateId: number;
  name: string;
  skillTags: string;
  constructor(
    fields?: {
      candidateId?: number;
      name?: string;
      skillTags?: string;
    }) {
    if (fields) Object.assign(this, fields);
  }
}
