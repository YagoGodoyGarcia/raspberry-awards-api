export interface Movie {
  title: string;
  year: number;
  studios: string;
  producers: string;
  winner: boolean;
}

export interface ImportResultDTO {
  totalLidos: number;
  inseridos: number;
  mensagem: string;
}