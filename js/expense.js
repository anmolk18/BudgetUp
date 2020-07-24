const expenses = document.querySelectorAll(".dash-nav-item")[2]

class Expense{
    constructor(user_id, name, value){
        this.user_id = user_id
        this.name = name
        this.value = value
    }

    render(){
        const expenseBox = ce("div")
        expenseBox.className = "form-row"
        expenseBox.innerHTML = `
            <div class="form-group col-md-8">
                <input type="text" value="${this.name}" size="70">
            </div>
            <div class="form-group col-md-3">
                <div class="input-group">
                    <div class="input-group-prepend">
                    <div class="input-group-text">$</div>
                    </div>
                    <input type="text" value="${this.value}" size="15">
                </div>
            </div>
            <button style="height:40px; width:80px" type="submit" class="btn-primary">Update</button>
        `
        const body = mainDash.querySelector(".card-body")
        body.append(expenseBox)
        updateButtonEvent()
    }
}

// updates page layout when "expenses" tab is clicked
function expensesEvent(){
    expenses.addEventListener("click", () => {
        event.preventDefault()
        mainDash.innerHTML = `
        <form>
            <div class="row">
                <div class="col-xl-12">
                    <div class="card spur-card">
                        <div class="card-header">
                            <h2><div class="spur-card-title"> My Expenses </div></h2>
                        </div>
                        <div class="card-body">
                            
                        </div>
                    </div>
                </div>
            </div>
            <button type="submit" class="btn-primary">Add a New Expense</button>
        </form>
        `
        getExpenses()
        addButtonEvent()
    })
}
expensesEvent()

function getExpenses(){
     const configObj = {
            mode: "cors",
            headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
         }
     fetch('http://localhost:3000/api/v1/expenses', configObj)
     .then(res => res.json())
     .then(expenses => expenses.forEach(expense => addExpense(expense)))
     .catch(err => {
        console.error('ERROR: ' + err)
      })
}

function addExpense(expense){
    let add
    let newExpense = new Expense(expense.user_id, expense.name, expense.value)
    add = newExpense.render()
}

function addButtonEvent(){
    const addButton = mainDash.querySelectorAll(".btn-primary")[0]
    addButton.addEventListener("click", () => {
    event.preventDefault()
    const newExpenseBox = ce("div")
    newExpenseBox.className = "form-row"
    newExpenseBox.innerHTML = `
        <div class="form-group col-md-8">
            <input type="text" placeholder="Expense Source" size="70">
        </div>
        <div class="form-group col-md-4">
            <div class="input-group">
                <div class="input-group-prepend">
                <div class="input-group-text">$</div>
                </div>
                <input type="text" placeholder="Amount" size="15">
            </div>
        </div>
        <button style="height:40px; width:50px" type="submit" id="add-expense-btn" class="btn-primary">Add</button>
    `

    const body = mainDash.querySelector(".card-body")
    body.append(newExpenseBox)
    addExpenseEvent()
    })
}

function updateButtonEvent(){
    const updateButton = mainDash.querySelectorAll(".btn-primary")[1]
    updateButton.addEventListener("click", () => {
        event.preventDefault()

    })
}

function addExpenseEvent(){
   const addExpenseData = mainDash.querySelector("#add-expense-btn")
   addExpenseData.addEventListener("click", () => {
       event.preventDefault()

   })
}


