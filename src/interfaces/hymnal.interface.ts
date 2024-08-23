export default interface Hymnal {
    slug: string;
    title: string;
    description: string;
    password: string;
    hymnns: { id: string; title: string; lyrics: string };
    id: string;
  }