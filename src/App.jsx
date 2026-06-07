import { useEffect, useState } from 'react'
import './App.css'
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'


function App() {

  const valorInicial = localStorage.getItem('gastos')

  const [gastos, setGastos] = useState(JSON.parse(valorInicial) || [])

  const [descricao, setDescricao] = useState("")
  const [valor, setValor] = useState("")
  const [categoria, setCategoria] = useState("categoria")

  const total = gastos.reduce((soma, gasto) => soma + gasto.valor, 0)

  function adicionarGasto(e) {
    e.preventDefault()
    
    if (!descricao||!valor) {
      alert("Preencha todos campos")
      return
    }

    if (categoria === "categoria") {
      alert("Selecione uma categoria")
      return
    }
    const novoGasto = { id: gastos.length + 1, descricao: descricao, valor: Number(valor), categoria: categoria }
    setGastos([...gastos, novoGasto])
    setDescricao("")
    setValor("")
    setCategoria("categoria")
  }

  function removerGasto(id) {
    setGastos(gastos.filter(tarefa => tarefa.id !== id))
  }

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos))
  }, [gastos])

  const totalCategoria = gastos.reduce((acc, gasto) => {
    acc[gasto.categoria] = (acc[gasto.categoria] || 0) + gasto.valor
    return acc
  }, {})

  const dadosGrafico = Object.entries(totalCategoria).map(([nome, valor]) => ({
    name: nome,
    value: valor
  }))

  const cores = ['#7c3aed', '#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6', '#14b8a6']

  function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  return (
    <>
      <h1>Spendy</h1>

      <form className="form-gasto" onSubmit={adicionarGasto}>
        <input className="input-gasto" type="text" placeholder='Descrição' value={descricao} onChange={e => setDescricao(e.target.value)} />
        <input className="input-gasto" type="number" placeholder='Valor' value={valor} onChange={e => setValor(e.target.value)} />
        <select className="select-categoria" value={categoria} onChange={e => setCategoria(e.target.value)}>
          <option value="categoria" disabled>Categoria</option>
          <option value="Alimentação">Alimentação</option>
          <option value="Saúde">Saúde</option>
          <option value="Lazer">Lazer</option>
          <option value="Transporte">Transporte</option>
          <option value="Educação">Educação</option>
          <option value="Vestuário">Vestuário</option>
          <option value="Moradia">Moradia</option>
        </select>
        <button className="btn-adicionar" type="submit">Adicionar Gasto</button>
      </form>

      {gastos.map(gasto => (
        <div className="card-gasto" key={gasto.id}>
          <p>{gasto.descricao}: {formatarMoeda(gasto.valor)} - {gasto.categoria}</p>
          <button className="btn-remover" onClick={() => removerGasto(gasto.id)}>Remover</button>
        </div>
      ))}
      <p className="total">Total: {formatarMoeda(total)}</p>

      <PieChart width={400} height={300}>
        <Pie data={dadosGrafico} dataKey="value" nameKey="name">
          {dadosGrafico.map((entry, index) => (
            <Cell key={index} fill={cores[index % cores.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>


    </>
  )
}

export default App
