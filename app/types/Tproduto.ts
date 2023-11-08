export default interface TiposProduto {
    id: string;
    nome: string;
    descricao?: string | undefined;
    preco: string;
    imagem?: string | undefined;
    disponibilidade: boolean;
    categoria_id: string;
    crud: "CRT" | "UPD";
    onclikCancela: any;
  }
  