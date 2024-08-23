export default interface Hymnal {
    titulo: string;
    description: string;
    password: string;
    himnos: { titulo: string; contenido: string; mediaId: string };
    mediaId: string;
  }