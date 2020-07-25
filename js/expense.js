const expenses = page.querySelectorAll(".dash-nav-item")[2]

class Expense{
    constructor(id, user_id, name, value){
        this.id = id
        this.user_id = user_id
        this.name = name
        this.value = value
    }

    render(){
        const expenseBox = ce("div")
        expenseBox.className = "form-row"
        expenseBox.innerHTML = `
            <div class="form-group col-md-6">
                <input type="text" id="name" value="${this.name}" size="60">
            </div>
            <div class="form-group col-md-2">
                <div class="input-group">
                    <div class="input-group-prepend">
                    <div class="input-group-text">$</div>
                </div>
                    <input type="text" id="amount" value="${this.value}" size="10">
                </div>
            </div>
            <button style="height:40px; width:80px; margin:5px;" type="submit" class="btn-primary">Update</button>
            <button style="height:40px; width:80px; margin:5px;" type="submit" id="del-expense-btn" class="btn-primary">Delete</button>
        `
        const singleExpense = mainDash.querySelector(".card-body")
        singleExpense.append(expenseBox)
        
        const updateBtn = expenseBox.querySelector(".btn-primary")
        updateBtn.addEventListener("click", () => {
            event.preventDefault()
            const configObj = {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    name: expenseBox.querySelector("#name").value,
                    value: expenseBox.querySelector("#amount").value
                })
            }
            fetch(`http://localhost:3000/api/v1/expenses/${this.id}`, configObj)
            .then(res => res.json())
            .then(updatedExpense => {
                updatedExpense.name = this.name
                updatedExpense.value = this.value
            })
        })

        const deleteBtn = expenseBox.querySelector("#del-expense-btn")
        deleteBtn.addEventListener("click", () => {
            event.preventDefault()
            const configObj = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            }
            fetch(`http://localhost:3000/api/v1/expenses/${this.id}`, configObj)
            .then(() => expenseBox.remove())
        })
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
        addBtnEvent()
    })
}
expensesEvent()

function getExpenses(){
    const configObj = {
        method: "GET",
        mode: "cors",
        headers: {
            Authorization: `Bearer ${localStorage.token}`,
            'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*',
        }
     }
    fetch('http://localhost:3000/api/v1/expenses', configObj)
    .then(res => res.json())
    .then(expenses => addExpenses(expenses)) 
    .catch(err => {
        console.error('ERROR: ' + err)
    })
}

function addExpenses(expenses){
    expenses.forEach(expense => {
        if (expense.user_id == localStorage.id){
            addExpense(expense)
        }
    })
}

function addExpense(expense){
    let add
    let newExpense = new Expense(expense.id, expense.user_id, expense.name, expense.value)
    add = newExpense.render()
}

function addBtnEvent(){
    const addBtn = mainDash.querySelectorAll(".btn-primary")[0]
    addBtn.addEventListener("click", () => {
        event.preventDefault()
        const newExpenseBox = ce("form")
        newExpenseBox.className = "new-expense"
        newExpenseBox.innerHTML = `
            <div class="form-row">
                <div class="form-group col-md-6">
                    <input type="text" placeholder="Expense Source" size="60">
                </div>
                <div class="form-group col-md-2">
                    <div class="input-group">
                        <div class="input-group-prepend">
                        <div class="input-group-text">$</div>
                        </div>
                        <input type="text" placeholder="Amount" size="10">
                    </div>
                </div>
                <button style="height:40px; width:80px; margin:5px;" type="submit" id="add-expense-btn" class="btn-primary">Add</button>
                <button style="height:40px; width:80px; margin:5px;" id="del-expense-btn" class="btn-primary">Delete</button>
            </div>
        `
        
        const newCardBody = mainDash.querySelector(".card-body")
        newCardBody.append(newExpenseBox)

        const addExpenseData = newCardBody.querySelector("form.new-expense")
        addExpenseData.addEventListener("submit", () => {
            event.preventDefault()
            const configObj = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    user_id: localStorage.id, 
                    name: event.target[0].value,
                    value: event.target[1].value
                })
            }
            fetch(`http://localhost:3000/api/v1/expenses`, configObj)
            .then(res => res.json())
            .then(newExpense => addExpense(newExpense))
            newExpenseBox.innerHTML = ""
        })

        const delExpenseData = newExpenseBox.querySelector("#del-expense-btn")
        delExpenseData.addEventListener("click", () => {
            event.preventDefault()
            const configObj = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
            }
            fetch(`http://localhost:3000/api/v1/expenses/${this.id}`, configObj)
            .then(() => newExpenseBox.remove())
        })

    })
}





