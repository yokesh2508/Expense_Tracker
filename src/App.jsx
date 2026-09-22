import React, { useEffect, useState } from 'react'

const App = () => {

  let [expName,setename]=useState("");
  let [amt,setAmt]=useState(0);
  let [cat,setCat]=useState("");
  let [expenses,setExp]=useState(()=>{
  let savedExpenses=localStorage.getItem("expenses");
    return savedExpenses?JSON.parse(savedExpenses):[]});
  let [filter,setFilter]=useState("All");
  let filteredCat=filter==="All"?expenses:expenses.filter((e)=>{return e.category===filter})
  
  useEffect(()=>{
    localStorage.setItem("expenses",JSON.stringify(expenses));
  },[expenses])
  
  function addExpense(){
    setExp([...expenses,{id:Date.now(),name:expName,amount:amt,category:cat}]);
  }
  function addition(){
    let myadd=expenses.reduce((a,i)=>{
      return a+Number(i.amount);
    },0)
    return "₹"+myadd;
  }
  function delExpense(index){
    let mydel=expenses.filter((e,i)=>{
      return e.id!=index
    })
    setExp(mydel);
  }

  return (
    <div id='main'>
      <div id='box'>
        <main id='head'><h1>🤑 Expense Tracker</h1></main>
        <main><p id='spentPara'>💰 Total Spent:{addition()}</p></main>
        <section id='fields'>
          <label htmlFor="expname">Expense Name</label>
          <input type="text" placeholder='Enter your Expense Name' id='expname' onChange={(e)=>{setename(e.target.value)}}/>
          <br />

          <label htmlFor="amt">Amount</label>
          <input type="number" placeholder='Enter your Amount' id='amt' onChange={(e)=>{setAmt(e.target.value)}}/>
          <br />

          <label htmlFor="cat">Category</label>
          <select name="" id="opt" value={cat} onChange={(e)=>{setCat(e.target.value)}}>
            <option value="" disabled>---Select Category---</option>
            <option value="Education">Education</option> 
            <option value="Food">Food</option>
            <option value="Fruits">Fruits</option>
            <option value="Grocery">Grocery</option>
            <option value="Health">Health</option>
            <option value="Juice">Juice</option>
            <option value="Petrol">Petrol</option>
            <option value="Shopping">Shopping</option>
            <option value="Snacks">Snacks</option>
            <option value="Transport">Transport</option>
          </select>
        </section>
        <section id='btn'><button id='addbtn' onClick={addExpense}>Add Expense</button></section>
      </div>
      
      <section id='expenses'>
        <header><h1 id='exp'>My Expenses</h1></header>
        <div id='list'>
          <div id='map'>
            <label htmlFor="" id='filterLabel'>Filter Category</label>
            <select name="" id="opt" onChange={(e)=>{setFilter(e.target.value)}}>
            <option value="All">All Category</option>
            <option value="Education">Education</option> 
            <option value="Food">Food</option>
            <option value="Fruits">Fruits</option>
            <option value="Grocery">Grocery</option>
            <option value="Health">Health</option>
            <option value="Juice">Juice</option>
            <option value="Petrol">Petrol</option>
            <option value="Shopping">Shopping</option>
            <option value="Snacks">Snacks</option>
            <option value="Transport">Transport</option>
          </select>
        </div>
        <section id='scroll'>
          {filteredCat.map((e,i)=>{
            return <React.Fragment key={i}>
              <section id='dis'>
                <p id='catPara' className='para'>Category:{e.category}</p>
                <p id='expPara' className='para'>{e.name}-₹{e.amount}</p>
                <button onClick={()=>{delExpense(e.id)}} id='delbtn'>Delete</button>
              </section>  
            </React.Fragment>
        })}
        </section>
        </div>
      </section>
    </div>
  )
}

export default App