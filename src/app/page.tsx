'use client'

import { useState } from 'react'

export default function Home() {
  const [form, setForm] = useState({ nome: '', valor: '', descricao: '' })
  const [registros, setRegistros] = useState([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setRegistros([...registros, form])
    setForm({ nome: '', valor: '', descricao: '' })
  }

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Controle Financeiro</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border p-2 w-full"
          placeholder="Nome"
          name="nome"
          value={form.nome}
          onChange={handleChange}
        />
        <input
          className="border p-2 w-full"
          placeholder="Valor"
          name="valor"
          value={form.valor}
          onChange={handleChange}
        />
        <textarea
          className="border p-2 w-full"
          placeholder="Descrição"
          name="descricao"
          value={form.descricao}
          onChange={handleChange}
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Adicionar</button>
      </form>

      <ul className="mt-6 space-y-2">
        {registros.map((item, index) => (
          <li key={index} className="border p-2 rounded">
            <strong>{item.nome}</strong>: R$ {item.valor} — {item.descricao}
          </li>
        ))}
      </ul>
    </main>
  )
}
