import prisma from "@/lib/prismadb"

import { NextResponse } from "next/server";


export async function POST(request: Request) {
    try {
        const body = await request.json();

        delete body.id;

        if (!body) {
            return new NextResponse("Faltando informações", { status: 400 });
        }

        const categoria = await prisma.categoria.create({
            data: body
        });
        return NextResponse.json(categoria);
    } catch (error: any) {
        console.log(error, "Erro de registro");
        return new NextResponse("Suposto Erro interno", { status: 500 });
    }
}

export async function GET() {
    const categoria = await prisma.categoria.findMany();
    return NextResponse.json(categoria);
}

export async function PUT(request: Request) {
    try {
      const data = await request.json();
  
  
      const { id, ...tipoCategoria } = data;
  
      if (!id) {
        return new NextResponse("ID não fornecido", { status: 400 });
      }
  
      // Verifique se a inspeção com o ID especificado existe
      const tipoCategoriaExistente = await prisma.categoria.findUnique({
        where: {
          id: id,
        },
      });
  
      if (!tipoCategoriaExistente) {
        return new NextResponse("Tipo de usuário não encontrado", { status: 404 });
      }
  
      // Atualize a inspeção com os novos dados
      const updateCategoria = await prisma.categoria.update({
        where: {
          id: id,
        },
        data: {
          ...tipoCategoria,
        },
      });
  
      return new NextResponse("Categoria atualizada com sucesso", { status: 200 });
    } catch (error: any) {
      console.log(error, "Erro de atualização");
      return new NextResponse("Suposto Erro interno" + error, { status: 500 });
    }
  }