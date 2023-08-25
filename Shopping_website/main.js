let shop=document.getElementById("shop")
// console.log(shop)

// if we have data already then retirve otherwise empty array
let basket=JSON.parse(localStorage.getItem("data")) || []

let generateShop=()=>{
    return shop.innerHTML=shopItemData.map((x)=>{
        let search=basket.find((z)=>z.id===x.id) || []
        return  ` 

            <div id=product-id-${x.id} class="item">
            <img width=220 src="${x.img}" alt="">
            <div class="details">
                <h3>${x.name}</h3>
                <p>${x.desc}</p>
                <div class="price-quantity">
                    <h2>$ ${x.price}</h2>
                    <div class="buttons">
                        <i onclick="decrement(${x.id})" class="bi bi-dash-lg"></i>
                            <div id=${x.id} class="quantity">
                                ${search.item===undefined?0:search.item}
                            </div>
                        <i onclick="increment(${x.id})" class="bi bi-plus-lg"></i>
                    </div>
                </div>
            </div>
        </div>
        `
    }).join("")
}

generateShop();

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
    // console.log(basket)
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
    localStorage.setItem("data", JSON.stringify(basket))
}

let update=(id)=>{
    let search=basket.find((z)=>z.id===id);
    // if(search)
    // console.log(search)
    document.getElementById(id).innerHTML=search.item;
    calculation();
}


let calculation=()=>{
    let carticon=document.getElementById("cartAmount")
    let sum=0;
    basket.forEach(element => {
        sum+=element.item
    });
    console.log(sum)
    carticon.innerHTML=sum
}
calculation()




















// function check(){
//     console.log("Bekar hai bhaiyya click ho gya mai div hoke bhi")
// }
