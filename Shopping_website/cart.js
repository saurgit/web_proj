let label=document.getElementById('label')
let shoppingcart=document.getElementById("shopping-cart")

// console.log(shopItemData)

let basket=JSON.parse(localStorage.getItem("data")) || []

let calculation=()=>{
    let carticon=document.getElementById("cartAmount")
    let sum=0;
    basket.forEach(element => {
        sum+=element.item
    });
    // console.log(sum)
    carticon.innerHTML=sum
}
calculation()


let generateCartItem=()=>{
    if(basket.length!==0){
        return shoppingcart.innerHTML=basket.map((x)=>{
            // console.log(x)
            let {id,item} = x;  //destructuring the object
            let search = shopItemData.find((y)=>y.id===id)||[]
            return `
            <div class="cart-item">
                <img width="100" src=${search.img} alt="/">
                <div class="details">
                    <div class="title-price-x">
                        <h4 class="title-price"> 
                        <p>${search.name}</p>
                        <p class="cart-price-item">$ ${search.price}</p>
                        </h4>
                        <i onclick="removeItem(${search.id})" class="bi bi-x-lg"></i>
                    </div>
                    <div class="buttons">
                        <i onclick="decrement(${x.id})" class="bi bi-dash-lg"></i>
                            <div id=${x.id} class="quantity">
                            ${item}
                            </div>
                        <i onclick="increment(${x.id})" class="bi bi-plus-lg"></i>
                    </div>
                    <h3>
                    $ ${item * search.price}
                    </h3>
                </div>
            </div>
            `
        }).join("")
        
    }else{
        // console.log("Basket os empty")
        shoppingcart.innerHTML=``;
        label.innerHTML=`
            <h2>Cart is Empty</h2>
            <a href="index.html">
            <button class="Homebtn">Back to home</button>
            </a>
        `
    }
};

generateCartItem();

let increment=(id)=>{
    let selectedItem=id;
    let search=basket.find((z)=> z.id===selectedItem.id)
    if(search===undefined){
        basket.push({
            id:selectedItem.id,
            item:1,
        });
    }else{
        search.item += 1;
    }
    update(selectedItem.id)
    generateCartItem();
    localStorage.setItem("data", JSON.stringify(basket))
}

let decrement=(id)=>{
    let selectedItem=id;
    let search=basket.find((z)=> z.id===selectedItem.id)
    if(search===undefined)return
    if(search.item===0)return
    else{
        search.item -= 1;
    }
    update(selectedItem.id)
    basket=basket.filter((x)=>x.item!==0)
    generateCartItem();
    localStorage.setItem("data", JSON.stringify(basket))
}
let update=(id)=>{
    let search=basket.find((z)=>z.id===id);
    // console.log(search)
    document.getElementById(id).innerHTML=search.item;
    calculation();
    totalAmount();
}

let removeItem=(id)=>{
    let selectedItem=id;
    basket=basket.filter((x)=>x.id!==selectedItem.id);
    localStorage.setItem("data",JSON.stringify(basket));
    generateCartItem();
    totalAmount();
    calculation();
}

let totalAmount=()=>{
    if(basket.length!==0){
        let amount=basket.map((x)=>{
            let search=shopItemData.find((z)=>z.id===x.id)||[]
            return (search.price)*(x.item);
        }).reduce((a,b)=>a+b,0);
        
    label.innerHTML=`
    <h2>Total Bill : $ ${amount}</h2>
    <button class="checkout">CheckOut</buttton>
    <button onclick="clearCart()"class="removeAll">Clear Cart</buttton>
    `;
    }else{
        return
    }

}
totalAmount();


let clearCart=()=>{
    basket=[];
    generateCartItem();
    localStorage.setItem("data",JSON.stringify(basket));
    calculation();
}

