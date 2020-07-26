document.addEventListener('DOMContentLoaded',function () {
    const formElem = document.querySelector('.calc__form');
    const summaryElem = document.querySelector('.calc__summary');

    const calculation = new Calculator(formElem, summaryElem)

});
const Calculator = function (formElem, summaryElem) {
    this.formElem = formElem;
    this.summaryElem = summaryElem;
    this.prices = {
        products: 0.5,
        orders: 0.25,
        package: {
            basic: 0,
            professional: 25,
            premium: 60
        },
        accounting: 35,
        terminal: 5
    };
    this.selectedProducts = [];
    this.formLisner();
    this.getPackage();
    this.getProducts();
    this.getOrders();
    this.getCheckboxes();


};
Calculator.prototype.formLisner = function () {
    this.formElem.addEventListener('change', (e)=> {
        e.preventDefault();
        this.summaryTotal(this.summaryElem, this.selectedProducts);
        this.showListItams(this.summaryElem, this.selectedProducts);


    })
};



Calculator.prototype.getProducts = function () {
    const products = document.querySelector('#products');
    products.addEventListener('change', ()=> {
        const productObj = {
            id: products.id,
            value: products.value,
            totalVal: products.value * this.prices.products
        }
        this.selectedProducts[0] = productObj;
    })
}
Calculator.prototype.getOrders = function () {
    const orders = document.querySelector('#orders');
    orders.addEventListener('change', ()=> {
        const ordersObj = {
            id: orders.id,
            value: orders.value,
            totalVal: orders.value * this.prices.orders
        }
        this.selectedProducts[1] = ordersObj;
    })
}
Calculator.prototype.getPackage = function () {
    const packageEl = document.querySelector('#package');
    packageEl.addEventListener('click',(e)=> {
        packageEl.classList.toggle('open');
        if (e.target.tagName === 'LI'){
            let packagePrice;
            if (e.target.dataset.value === 'basic'){
                packagePrice = this.prices.package.basic
            }
            if (e.target.dataset.value === 'professional'){
                packagePrice = this.prices.package.professional
            }
            if (e.target.dataset.value === 'premium'){
                packagePrice = this.prices.package.premium
            }
            packageEl.firstElementChild.innerText = (e.target.dataset.value);
            const packageElObj = {
                id: packageEl.id,
                value: e.target.dataset.value,
                totalVal: packagePrice
            }
            this.selectedProducts[2] = packageElObj;
        //todo:: problem z przładmowaniem gdy wybierze sie inny pakiet
        }
    });
}
Calculator.prototype.getCheckboxes = function () {
    const accounting = this.formElem.querySelector('#accounting');
    const terminal = this.formElem.querySelector('#terminal');
    accounting.addEventListener('click', ()=>{
        if (accounting.checked){
            const accountingObj = {
                id: accounting.id,
                value: accounting.checked,
                totalVal: this.prices.accounting
            }
            this.selectedProducts[3] = accountingObj;
        }else if (accounting.checked === false){
            const accountingObj = {
                id: accounting.id,
                value: accounting.checked,
                totalVal: 0
            }
            this.selectedProducts[3] = accountingObj;
        }

    });
    terminal.addEventListener('click', ()=>{
        if (terminal.checked){
            const terminalObj = {
                id: terminal.id,
                value: terminal.checked,
                totalVal: this.prices.terminal
            }
            this.selectedProducts[4] = terminalObj;
        }else if (terminal.checked === false){
            const terminalObj = {
                id: terminal.id,
                value: terminal.checked,
                totalVal: 0
            }
            this.selectedProducts[4] = terminalObj;
        }
    })
};
Calculator.prototype.summaryTotal = function (summaryElem, priceObj) {
    const totalElem = summaryElem.lastElementChild;
    if (priceObj.length > 0){
        totalElem.classList.add('open');
        const totaleVal = priceObj.reduce(function (acc, curr) {
            return acc + curr.totalVal;
        },0);
        totalElem.lastElementChild.innerText = `$ ${totaleVal}`;
    }
}
Calculator.prototype.showListItams = function (summaryElem, priceObj) {
    console.log(this.selectedProducts);
    const liElems = summaryElem.querySelectorAll('.list__item');
    if (priceObj[0]){
        liElems[0].classList.add('open');
        liElems[0].children[1].innerText = `${priceObj[0].value} * ${this.prices.products}`;
        liElems[0].lastElementChild.innerText = `$ ${priceObj[0].totalVal}`;
    }
    if (priceObj[1]){
        liElems[1].classList.add('open');
        liElems[1].children[1].innerText = `${priceObj[1].value} * ${this.prices.orders}`;
        liElems[1].lastElementChild.innerText = `$ ${priceObj[1].totalVal}`;
    }
    if (priceObj[2]){
        liElems[2].classList.add('open');
        liElems[2].children[1].innerText = `${priceObj[2].value}`;
        liElems[2].lastElementChild.innerText = `$ ${priceObj[2].totalVal}`;
    }
    console.log(priceObj[3]);
    if (priceObj[3]){
        liElems[3].classList.add('open');
        liElems[3].lastElementChild.innerText = `$ ${priceObj[3].totalVal}`;
        if (priceObj[3].value === false){
            liElems[3].classList.remove('open');
        }
    }
    if (priceObj[4]){
        liElems[4].classList.add('open');
        liElems[4].lastElementChild.innerText = `$ ${priceObj[4].totalVal}`;
        if (priceObj[4].value === false){
            liElems[4].classList.remove('open');
        }
    }
}

//todo:: zminic document.querySelector('#package'); na formelm zeby nie przeszukiwac calej stony
//todo:: zmienic obiekt z watosciamy, wycofac sie z tablic przy getproduct itd, oraz z showListItams