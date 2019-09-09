export class candidate {
  candidateId: number;
  name: string;
  skillTags: string;
  matchRatio: number;
  constructor(
    fields?: {
      candidateId?: number;
      name?: string;
      skillTags?: string;
      matchRatio?: number;
    }) {
    if (fields) Object.assign(this, fields);
  }
}
