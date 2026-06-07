import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const valorInicial = localStorage.getItem('gastos')

  const [gastos,setGastos] = useState(JSON.parse(valorInicial) || [])

  const [descricao, setDescricao] = useState("")
  const [valor, setValor] = useState("")

  const total = gastos.reduce((soma,gasto) => soma + gasto.valor,0)
  
  function adicionarGasto(e){
    e.preventDefault()
    const novoGasto = {id:gastos.length + 1, descricao: descricao, valor: Number(valor)} 
    setGastos([...gastos,novoGasto])
    setDescricao("")
    setValor("")
  }

  function removerGasto(id){
    setGastos(gastos.filter(tarefa => tarefa.id !== id))
  }

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos))
  }, [gastos])

  return (
    <>
      <h1>Spendy</h1>

      <form className="form-gasto" onSubmit={adicionarGasto}>
        <input className="input-gasto" type="text" placeholder='Descrição' value={descricao} onChange={e=> setDescricao(e.target.value)}/>
        <input className="input-gasto" type="number" placeholder='Valor' value={valor} onChange={e=> setValor(e.target.value)}  />
        <button className="btn-adicionar" type="submit">Adicionar Gasto</button>
      </form>

      {gastos.map(gasto => (
        <div className="card-gasto" key={gasto.id}>
        <p>{gasto.descricao}: {gasto.valor}</p>
        <button className="btn-remover" onClick={() => removerGasto(gasto.id)}>Remover</button>
      </div>
      ))}
      <p className="total">Total: {total}</p>
    </>
  )
}

export default App
