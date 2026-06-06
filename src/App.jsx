import { useState } from 'react'

function App() {

  const [gastos,setGastos] = useState([
    {id: 1, descricao: "Academia", valor: 150 },
    {id: 2, descricao: "Mercado", valor: 500 },
    {id: 3, descricao: "Transporte", valor: 250}])

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

  return (
    <>
      <h1>Spendy</h1>

      <form onSubmit={adicionarGasto}>
        <input type="text" placeholder='Descrição' value={descricao} onChange={e=> setDescricao(e.target.value)}/>
        <input type="number" placeholder='Valor' value={valor} onChange={e=> setValor(e.target.value)}  />
        <button id ="btn-adc-gasto" type="submit">Adicionar Gasto</button>
      </form>

      {gastos.map(gasto => (
        <div key={gasto.id}>
        <p>{gasto.descricao}: {gasto.valor}</p>
        <button onClick={() => removerGasto(gasto.id)}>Remover</button>
      </div>
      ))}
      <p>Total: {total}</p>
    </>
  )
}

export default App
