import prisma from "@/lib/prismadb"

import { NextResponse } from "next/server";


export async function POST(request: Request) {
    try {
        const body = await request.json();

        delete body.id;

        delete body.dataPedido;

        const agora = new Date();

        body.dataPedido = agora;
        
        if (body.total) {
          body.total = parseFloat(body.total);
        }

        if (!body) {
            return new NextResponse("Faltando informações", { status: 400 });
        }

        const pedido = await prisma.pedido.create({
            data: body
        });
        return NextResponse.json(pedido);
    } catch (error: any) {
        console.log(error, "Erro de registro");
        return new NextResponse("Suposto Erro interno", { status: 500 });
    }
}

export async function GET() {
    const pedido = await prisma.pedido.findMany();
    return NextResponse.json(pedido);
}

export async function PUT(request: Request) {
    try {
      const data = await request.json();
  
  
      const { id, ...tipoPedido } = data;
  
      if (!id) {
        return new NextResponse("ID não fornecido", { status: 400 });
      }
  
      // Verifique se a inspeção com o ID especificado existe
      const tipoPedidoExistente = await prisma.pedido.findUnique({
        where: {
          id: id,
        },
      });
  
      if (!tipoPedidoExistente) {
        return new NextResponse("Tipo de usuário não encontrado", { status: 404 });
      }
  
      // Atualize a inspeção com os novos dados
      const updateProdutoPedido = await prisma.pedido.update({
        where: {
          id: id,
        },
        data: {
          ...tipoPedido,
        },
      });
  
      return new NextResponse("Tipo de usuário atualizado com sucesso", { status: 200 });
    } catch (error: any) {
      console.log(error, "Erro de atualização");
      return new NextResponse("Suposto Erro interno" + error, { status: 500 });
    }
  }