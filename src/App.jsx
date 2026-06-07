import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const valorInicial = localStorage.getItem('gastos')

  const [gastos, setGastos] = useState(JSON.parse(valorInicial) || [])

  const [descricao, setDescricao] = useState("")
  const [valor, setValor] = useState("")
  const [categoria, setCategoria] = useState("categoria")

  const total = gastos.reduce((soma, gasto) => soma + gasto.valor, 0)

  function adicionarGasto(e) {
    e.preventDefault()
    if(categoria === "categoria"){
      alert("Selecione uma categoria")
      return
    }
    const novoGasto = { id: gastos.length + 1, descricao: descricao, valor: Number(valor), categoria: categoria}
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

  return (
    <>
      <h1>Spendy</h1>

      <form className="form-gasto" onSubmit={adicionarGasto}>
        <input className="input-gasto" type="text" placeholder='Descrição' value={descricao} onChange={e => setDescricao(e.target.value)} />
        <input className="input-gasto" type="number" placeholder='Valor' value={valor} onChange={e => setValor(e.target.value)} />
        <select value={categoria} onChange={e => setCategoria(e.target.value)}>
          <option value="categoria" disabled>Categoria</option>
          <option value="alimentacao">Alimentação</option>
          <option value="lazer">Lazer</option>
          <option value="transporte">Transporte</option>
          <option value="educacao">Educação</option>
        </select>
        <button className="btn-adicionar" type="submit">Adicionar Gasto</button>
      </form>

      {gastos.map(gasto => (
        <div className="card-gasto" key={gasto.id}>
          <p>{gasto.descricao}: {gasto.valor} - {gasto.categoria}</p>
          <button className="btn-remover" onClick={() => removerGasto(gasto.id)}>Remover</button>
        </div>
      ))}
      <p className="total">Total: {total}</p>
    </>
  )
}

export default App
