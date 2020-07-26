document.addEventListener('DOMContentLoaded',function () {

    const hamburger = document.querySelector(".hamburger");
    const headerLinks = document.querySelector(".header__links");
    hamburger.addEventListener("click", function () {
        hamburger.classList.toggle("clicked");
        headerLinks.classList.toggle("clicked");
    });


    const choosePackageselectInput = document.querySelector('.select__input');
    dropDownMenuDisplay(choosePackageselectInput);
    dropDownMenuHide(choosePackageselectInput);
    form(choosePackageselectInput);
})




const dropDownMenuDisplay = function (selectInput) {

    selectInput.addEventListener('click', function () {
        selectInput.nextElementSibling.style.display = 'block';
        // const selectList = Array.from(selectInput.nextElementSibling.children);
        // selectList.forEach(function (li) {
        //     li.addEventListener('mouseenter', function () {
        //         this.style.backgroundColor = '#00000029';
        //     })
        //     li.addEventListener('mouseleave', function () {
        //         this.style.backgroundColor = 'inherit';
        //     })
        // });
    })
}
const dropDownMenuHide = function (selectInput) {
    const listPackage = Array.from(document.querySelector('.select__dropdown').children);
    listPackage.forEach(function (listItem) {
        listItem.addEventListener('click',function () {
            console.log(`I was clicked ${this.innerText}`);
            selectInput.innerText = this.innerText;
            selectInput.nextElementSibling.style.display = 'none';

        })

    })

}

const form = function (selectInput) {
    const formElem = document.querySelector('form');
    formElem.addEventListener('change', function (e) {
        const products = document.querySelector('#products').value;
        const orders = document.querySelector('#orders').value;
        let packageType = document.querySelector('#package').innerText;
        //todo:: nie działa change, nie odświerza listy
        const accounting = document.querySelector('#accounting').checked;
        const terminal = document.querySelector('#terminal').checked;
        if (packageType === 'Choose package'){
            packageType = '';
        }
        if ((products > 0) && (orders > 0)){
            const calculatorObject = new CalculatorSubmit(products, orders, packageType, accounting, terminal);
            console.log(calculatorObject);
            calcShowRow();

        }

    })
}


const CalculatorSubmit = function (products, orders, packageType, accounting, terminal) {
    this.products = products;
    this.orders = orders;
    this.packageType = packageType;
    this.accounting = accounting;
    this.termonal = terminal;

    this.total;
}


const calcShowRow = function (rowToShowHide) {

    const totalPrice = document.querySelector('#total-price');
    // rowToShowHide.classList.toggle('open')
    const openItems = document.querySelectorAll('.calc__summary ul .open')
    if (openItems.length > 0){
        totalPrice.classList.add('open');
    }else {
        totalPrice.classList.remove('open');
    }
}



