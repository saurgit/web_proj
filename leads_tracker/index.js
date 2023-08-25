

let myleads=[]

const inuptbtn=document.getElementById("input-btn")
const inputel=document.getElementById("input-el")
const ulel=document.getElementById("ul-id")
const delel=document.getElementById("delete-btn")
const tabbtn=document.getElementById("tab-btn")

tabbtn.addEventListener("click",function(){
    chrome.tabs.query({active:true, currentWindow:true},function(tabs){
        // console.log(tabs)
        myleads.push(tabs[0].url)
        localStorage.setItem("myleads",JSON.stringify(myleads))
        renderLeads(myleads)
    })
})

delel.addEventListener("dblclick",function(){
    localStorage.clear()
    myleads.length=0
    renderLeads(myleads)
})


const prevlead=JSON.parse(localStorage.getItem("myleads"))
if(prevlead){
    myleads=prevlead
    renderLeads(myleads)
}

inuptbtn.addEventListener("click",function(){
    myleads.push(inputel.value)
    inputel.value=""
    localStorage.setItem("myleads",JSON.stringify(myleads))
    renderLeads(myleads)
    console.log(localStorage.getItem("myleads"))
})



function renderLeads(leads){
    let listitem=""
    for(let i=0;i<leads.length;i++){
        listitem+=`
            <li> 
                <a target='_blank' href='${leads[i]}'> 
                ${leads[i]}
                </a>
            </li>
            `
    }
    ulel.innerHTML=listitem
}
















// let mystr=`
//     hey this is me

//     how are you?

//     where are you going?
// `
// console.log(mystr)



















// myleads=JSON.parse(myleads)
// myleads.push("www.mnnit.ac.in")
// console.log(typeof myleads)

// myleads=JSON.stringify(myleads)

// console.log(typeof myleads)


// localStorage.setItem("myleads",JSON.stringify(myleads))

// console.log(JSON.parse(localStorage.getItem("myleads")))









// function clicked(){
    //     console.log("Button Clicked")
    //     // content.textContent="Button Clicked";
    // }
    
    // let divcnt=document.getElementById("div-id")
    // divcnt.addEventListener("click",function(){
    //     console.log("I want to open the Box")
    // })

// inuptbtn.addEventListener("click",function(){
    //     // console.log("Button clicked")
    //     // myleads.push(inputel.value)
    //     // inputel.value=""
    //     // console.log(myleads)
    //     // for(let i=0;i<myleads.length;i++){
    //        
    //         // console.log(ulel)
    //     // }
    // })