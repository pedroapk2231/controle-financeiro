"use client";

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export default function FinanceControlApp() {
  const [form, setForm] = useState({
    data: '',
    descricao: '',
    categoria: '',
    tipo: 'Entrada',
    valor: '',
    formaPagamento: ''
  });
  const [registros, setRegistros] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const adicionarRegistro = () => {
    setRegistros([...registros, form]);
    setForm({
      data: '',
      descricao: '',
      categoria: '',
      tipo: 'Entrada',
      valor: '',
      formaPagamento: ''
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Controle Financeiro Empresarial</h1>
      <Tabs defaultValue="registro">
        <TabsList>
          <TabsTrigger value="registro">Novo Registro</TabsTrigger>
          <TabsTrigger value="visualizacao">Visualizar Registros</TabsTrigger>
        </TabsList>

        <TabsContent value="registro">
          <Card className="mt-4">
            <CardContent className="space-y-4 pt-4">
              <Input name="data" type="date" value={form.data} onChange={handleChange} placeholder="Data" />
              <Input name="descricao" value={form.descricao} onChange={handleChange} placeholder="Descrição" />
              <Input name="categoria" value={form.categoria} onChange={handleChange} placeholder="Categoria" />
              <select name="tipo" value={form.tipo} onChange={handleChange} className="w-full border rounded p-2">
                <option>Entrada</option>
                <option>Saída</option>
              </select>
              <Input name="valor" type="number" value={form.valor} onChange={handleChange} placeholder="Valor (R$)" />
              <Input name="formaPagamento" value={form.formaPagamento} onChange={handleChange} placeholder="Forma de Pagamento" />
              <Button onClick={adicionarRegistro}>Adicionar</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visualizacao">
          <div className="grid gap-4 mt-4">
            {registros.length === 0 ? (
              <p className="text-gray-500">Nenhum registro adicionado ainda.</p>
            ) : (
              registros.map((item, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <p><strong>Data:</strong> {item.data}</p>
                    <p><strong>Descrição:</strong> {item.descricao}</p>
                    <p><strong>Categoria:</strong> {item.categoria}</p>
                    <p><strong>Tipo:</strong> {item.tipo}</p>
                    <p><strong>Valor:</strong> R$ {parseFloat(item.valor).toFixed(2)}</p>
                    <p><strong>Forma de Pagamento:</strong> {item.formaPagamento}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
