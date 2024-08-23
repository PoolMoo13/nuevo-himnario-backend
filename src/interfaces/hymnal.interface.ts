export default interface Hymnal {
    titulo: string;
    description: string;
    password: string;
    himnos: { titulo: string; contenido: string; id: string };
    id: string;
  }