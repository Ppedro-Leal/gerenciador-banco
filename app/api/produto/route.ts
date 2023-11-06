import prisma from "@/lib/prismadb"

import { NextResponse } from "next/server";


export async function POST(request: Request) {
    try {
        const body = await request.json();

        delete body.id;

        if (!body) {
            return new NextResponse("Faltando informações", { status: 400 });
        }

        const produto = await prisma.produto.create({
            data: body
        });
        return NextResponse.json(produto);
    } catch (error: any) {
        console.log(error, "Erro de registro");
        return new NextResponse("Suposto Erro interno", { status: 500 });
    }
}

export async function GET() {
    const produto = await prisma.produto.findMany();
    return NextResponse.json(produto);
}

export async function PUT(request: Request) {
    try {
      const data = await request.json();
  
  
      const { id, ...tipoProduto } = data;
  
      if (!id) {
        return new NextResponse("ID não fornecido", { status: 400 });
      }
  
      // Verifique se a inspeção com o ID especificado existe
      const tipoProdutoExistente = await prisma.produto.findUnique({
        where: {
          id: id,
        },
      });
  
      if (!tipoProdutoExistente) {
        return new NextResponse("Tipo de usuário não encontrado", { status: 404 });
      }
  
      // Atualize a inspeção com os novos dados
      const updateProdutoPedido = await prisma.produto.update({
        where: {
          id: id,
        },
        data: {
          ...tipoProduto,
        },
      });
  
      return new NextResponse("Tipo de usuário atualizado com sucesso", { status: 200 });
    } catch (error: any) {
      console.log(error, "Erro de atualização");
      return new NextResponse("Suposto Erro interno" + error, { status: 500 });
    }
  }