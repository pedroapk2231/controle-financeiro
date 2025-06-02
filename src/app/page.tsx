'use client';

import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';

interface Registro {
  id: string;
  nome: string;
  valor: string;
  descricao: string;
}

export default function Home() {
  const [form, setForm] = useState({
    nome: '',
    valor: '',
    descricao: '',
  });

  const [registros, setRegistros] = useState<Registro[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'registros'), form);
      alert('Registro salvo com sucesso!');
      setForm({ nome: '', valor: '', descricao: '' });
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro ao salvar o registro.');
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'registros'), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Registro[];

      setRegistros(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Controle Financeiro</h1>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-8">
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={form.nome}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="valor"
          placeholder="Valor"
          value={form.valor}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <textarea
          name="descricao"
          placeholder="Descrição"
          value={form.descricao}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Salvar
        </button>
      </form>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Registros:</h2>
        {registros.map((registro) => (
          <div key={registro.id} className="border p-3 rounded shadow-sm">
            <p><strong>Nome:</strong> {registro.nome}</p>
            <p><strong>Valor:</strong> {registro.valor}</p>
            <p><strong>Descrição:</strong> {registro.descricao}</p>
          </div>
        ))}
      </div>
    </main>
  );
}


