const ce = (element) => document.createElement(element)
const mainDash = page.querySelector("main.dash-content")
const incomes = page.querySelectorAll(".dash-nav-item")[1]

class Income{
    constructor(user_id, name, value){
        this.user_id = user_id
        this.name = name
        this.value = value
    }

    render(){
        const incomeBox = ce("div")
        incomeBox.className = "form-row"
        incomeBox.innerHTML = `
            <div class="form-group col-md-8">
                <input type="text" id="name" value="${this.name}" size="70">
            </div>
            <div class="form-group col-md-3">
                <div class="input-group">
                    <div class="input-group-prepend">
                    <div class="input-group-text">$</div>
                    </div>
                    <input type="text" id="amount" value="${this.value}" size="15">
                </div>
            </div>
            <button style="height:40px; width:80px" type="submit" class="btn-primary">Update</button>
        `
        const body = mainDash.querySelector(".card-body")
        body.append(incomeBox)
        const updateButton = incomeBox.querySelector(".btn-primary")
        updateButton.addEventListener("click", () => {
            event.preventDefault()
            const configObj = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    name: incomeBox.querySelector("#name").value,
                    value: incomeBox.querySelector("#amount").value
                })
            }
            fetch(`http://localhost:3000/api/v1/incomes/${this.id}`, configObj)
            .then(res => res.json())
            .then(
                console.log
            )
            })
        
    }
}

// updates page layout when "Incomes" tab is clicked
function incomesEvent(){
    incomes.addEventListener("click", () => {
        event.preventDefault()
        mainDash.innerHTML = `
        <form>
            <div class="row">
                <div class="col-xl-12">
                    <div class="card spur-card">
                        <div class="card-header">
                            <h2><div class="spur-card-title"> My Incomes </div></h2>
                        </div>
                        <div class="card-body">
                            
                        </div>
                    </div>
                </div>
            </div>
            <button type="submit" class="btn-primary">Add a New Income</button>
        </form>
        `
        getIncomes()
        addButtonEvent()
    })
}
incomesEvent()

function getIncomes(){
     const configObj = {
            method: "GET",
            mode: "cors",
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
                'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*',
            }
         }
     fetch('http://localhost:3000/api/v1/incomes', configObj)
     .then(res => res.json())
     .then(incomes => incomes.forEach(income => addIncome(income)))
     .catch(err => {
        console.error('ERROR: ' + err)
      })
}

function addIncome(income){
    let add
    let newIncome = new Income(income.user_id, income.name, income.value)
    add = newIncome.render()
}

function addButtonEvent(){
    const addButton = mainDash.querySelectorAll(".btn-primary")[0]
    addButton.addEventListener("click", () => {
    event.preventDefault()
    const newIncomeBox = ce("div")
    newIncomeBox.className = "form-row"
    newIncomeBox.innerHTML = `
        <div class="form-group col-md-8">
            <input type="text" placeholder="Income Source" size="70">
        </div>
        <div class="form-group col-md-4">
            <div class="input-group">
                <div class="input-group-prepend">
                <div class="input-group-text">$</div>
                </div>
                <input type="text" placeholder="Amount" size="15">
            </div>
        </div>
        <button style="height:40px; width:50px" type="submit" id="add-income-btn" class="btn-primary">Add</button>
    `

    const body = mainDash.querySelector(".card-body")
    body.append(newIncomeBox)
    addIncomeEvent()
    })
}




