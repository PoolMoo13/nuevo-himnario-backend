export default interface Hymnal {
    slug: string;
    title: string;
    description: string;
    password: string;
    hymns: { id: string; title: string; lyrics: string };
    id: string;
  }