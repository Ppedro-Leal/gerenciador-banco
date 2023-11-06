"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import TiposType from "@/app/types/TTipos";
import { CategoriaSchema } from "@/validators/FormCategoria";

type Input = z.infer<typeof CategoriaSchema>;

const value : any = [] 

export default function FormCategoria({
  id,
  nome,
  crud,
  onclikCancela

}: TiposType) {

  const defaultValues = {
    id: crud === "UPD" ? id : "",
    nome: crud === "UPD" ? nome : ""
  }


  const form = useForm<Input>({
    resolver: zodResolver(CategoriaSchema),
    defaultValues
  });

  useEffect(() => {
    form.setValue("id", crud === "UPD" ? id : "");
    form.setValue("nome", crud === "UPD" ? nome : "");
    
  }, [form, crud, id, nome]);



  function onSubmit(data: Input) {

    if(crud == 'UPD') {
      fetch("/api/categoria", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro na solicitação POST");
          }
        })
        .catch((error) => {
          console.error("Erro:", error);
        });
    }


    if(crud == 'CRT'){
      fetch("/api/categoria", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro na solicitação POST");
          }
        })
        .catch((error) => {
          console.error("Erro:", error);
        });

    }
    
  }

  return (
    <Card className="rounded-xl w-[330px] h-fit p-2 relative dark:bg-slate-900">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent>
          <Form {...form}>
            <div className="flex flex-col justify-between items-center w-full space-y-6">
            {crud == 'CRT' ? "Form Criar Categoria" : "Form Atualizar Categoria"}
              <div className="flex flex-col w-full ">
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[12px]">Categoria</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Frios"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

            </div>
          </Form>
        </CardContent>

        <CardFooter className="py-3 space-x-6 flex flex-row pt-6">
        {crud == "UPD" ? (
            <Button
              className="w-1/2"
              variant={"ghost"}
              type="reset"
              onClick={()=>onclikCancela('sds')}
             
            >
              {" "}
              Cancelar
            </Button>
          ) : (
            <Button
              className="w-1/2"
              variant={"ghost"}
              type="reset"
              onClick={() => {
                form.reset(defaultValues);
              }}
            >
              {" "}
              Limpar
            </Button>
          )}
          <Button className="w-1/2" variant={"outline"} type="submit">
            Salvar
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
