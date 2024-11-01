export default interface Hymnal {
    slug: string;
    title: string;
    description: string;
    password: string;
    passwordEdit: string;
    hymns: { id: string; title: string; lyrics: string };
    id: string;
  }