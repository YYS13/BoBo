const text = document.querySelectorAll(".thePaths");

for (let i = 0; i < text.length; i++) {
  console.log(`text number ${i} length is ${text[i].getTotalLength()}`);
}

const lastWord = document.querySelector("#forth");
const animation = document.querySelector("div.animation");
lastWord.addEventListener("animationend", () => {
  animation.style = "transition: all 1s ease; opacity: 0; pointer-events: none;";
})
let section = document.querySelector("section")
let button = document.querySelector("form button")

button.addEventListener("click",e=>{
    e.preventDefault();
    //抓出輸入的內容
    let text = e.target.parentElement.children[0].value;
    let year = e.target.parentElement.children[1].value;
    let month = e.target.parentElement.children[2].value;
    let date = e.target.parentElement.children[3].value;
    let hour = e.target.parentElement.children[4].value;
    let min = e.target.parentElement.children[5].value;
    //創建要新增的在下方的內容
    let div =document.createElement("div")
    div.classList.add("todo")
    let todo_text = document.createElement("p")
    todo_text.classList.add("todo-text")
    todo_text.innerText = text
    let todo_date =document.createElement("p")
    todo_date.classList.add("todo-date")
    todo_date.innerText = year +"/"+month+"/"+date
    let todo_time = document.createElement("p")
    todo_time.classList.add("todo-time")
    todo_time.innerText = hour+":"+min
    div.appendChild(todo_text)
    div.appendChild(todo_date)
    div.appendChild(todo_time)
    //新增check、trash button
    let check_button = document.createElement("button")
    check_button.classList.add("check-button")
    check_button.innerHTML = '<i class="fas fa-check"></i>'
    check_button.addEventListener("click",e=>{
        checkItem = e.target.parentElement
        checkItem.classList.toggle("done");
    })
    let trash_button = document.createElement("button")
    trash_button.classList.add("trash-button")
    trash_button.innerHTML = '<i class="fas fa-trash"></i>'
    trash_button.addEventListener("click",e=>{
        trashItem = e.target.parentElement
        trashItem.addEventListener("animationend",e=>{
            //移除local storage的資料
            let text = trashItem.children[0].innerText
            let myListArray = JSON.parse(localStorage.getItem("list"));
            myListArray.forEach((item,index)=>{
                if(item.text == text){
                    myListArray.splice(index,1)
                    localStorage.setItem("list",JSON.stringify(myListArray));
                }
            })
            
            trashItem.remove()
        })
        trashItem.style.animation = "scaleDown 0.3s forwards"
    })
    div.appendChild(check_button)
    div.appendChild(trash_button)


    //創建一個object，以便放在localStorage
    let myTodo = {
      text:text,
      year:year,
      month:month,
      date:date,
      hour:hour,
      min:min
    }
    //將新增的data放入local storage
    let mylist = localStorage.getItem("list")
    if(mylist == null){
        localStorage.setItem("list",JSON.stringify([myTodo]));
    }else{
        let myListArray = JSON.parse(mylist);
        myListArray.push(myTodo);
        localStorage.setItem("list",JSON.stringify(myListArray));
    }
    console.log(JSON.parse(localStorage.getItem("list")));

    e.target.parentElement.children[0].value ="";
    section.appendChild(div)
})

loadData();
//創造一個function讓每次進到網頁時會自動呈現之前輸入並存在local storage的東西
function loadData(){
    let myList = localStorage.getItem("list")
    if(myList != null){
        let myListArray = JSON.parse(myList)
        myListArray.forEach(item=>{
        //創建要新增的在下方的內容
        let div =document.createElement("div")
        div.classList.add("todo")
        let todo_text = document.createElement("p")
        todo_text.classList.add("todo-text")
        todo_text.innerText = item.text
        let todo_date =document.createElement("p")
        todo_date.classList.add("todo-date")
        todo_date.innerText = item.year +"/"+item.month+"/"+item.date
        let todo_time = document.createElement("p")
        todo_time.classList.add("todo-time")
        todo_time.innerText = item.hour+":"+item.min
        div.appendChild(todo_text)
        div.appendChild(todo_date)
        div.appendChild(todo_time)
        //新增check、trash button
        let check_button = document.createElement("button")
        check_button.classList.add("check-button")
        check_button.innerHTML = '<i class="fas fa-check"></i>'
        check_button.addEventListener("click",e=>{
            checkItem = e.target.parentElement
            checkItem.classList.toggle("done");
        })
        let trash_button = document.createElement("button")
        trash_button.classList.add("trash-button")
        trash_button.innerHTML = '<i class="fas fa-trash"></i>'
        trash_button.addEventListener("click",e=>{
            trashItem = e.target.parentElement
            trashItem.addEventListener("animationend",e=>{
                //移除local storage的資料
                let text = trashItem.children[0].innerText
                let myListArray = JSON.parse(localStorage.getItem("list"));
                myListArray.forEach((item,index)=>{
                    if(item.text == text){
                        myListArray.splice(index,1)
                        localStorage.setItem("list",JSON.stringify(myListArray));
                    }
                })
                
                trashItem.remove()
            })
            trashItem.style.animation = "scaleDown 0.3s forwards"
        })
        div.appendChild(check_button)
        div.appendChild(trash_button)

        section.appendChild(div)
        })
    }
}

function mergeTime(arr1,arr2){
    let result =[];
    let i = 0;
    let j = 0;

    while(i<arr1.length && j<arr2.length){
        if(Number(arr1[i].year) > Number(arr2[j].year)){
            result.push(arr2[j]);
            j++;
            }else if (Number(arr1[i].year) < Number(arr2[j].year)){
            result.push(arr1[i]);
            i++;
            }else if (Number(arr1[i].year) == Number(arr2[j].year)){
            if(Number(arr1[i].month) > Number(arr2[j].month)){
                result.push(arr2[j]);
                j++;
            }else if (Number(arr1[i].month) < Number(arr2[j].month)){
                result.push(arr1[i]);
                i++;
            }else if (Number(arr1[i].month) == Number(arr2[j].month)){
                if(Number(arr1[i].date) > Number(arr2[j].date)){
                result.push(arr2[j]);
                j++;
                }else if (Number(arr1[i].date) < Number(arr2[j].date)){
                    result.push(arr1[i]);
                    i++;
                }else if (Number(arr1[i].date) == Number(arr2[j].date)){
                    if(Number(arr1[i].hour) > Number(arr2[j].hour)){
                        result.push(arr2[j]);
                        j++;
                    }else if (Number(arr1[i].hour) < Number(arr2[j].hour)){
                        result.push(arr1[i]);
                        i++;
                    }else if (Number(arr1[i].hour) == Number(arr2[j].hour)){
                        if(Number(arr1[i].min) > Number(arr2[j].min)){
                            result.push(arr2[j]);
                            j++;
                        }else{
                          result.push(arr1[i]);
                          i++;
                        }
                    }
                }
            }
        
        }
    }
    while(i < arr1.length){
    result.push(arr1[i]);
    i++;
    }
    while(j < arr2.length){
    result.push(arr2[j]);
    j++;
    }

    return result;
}
function mergeSort(arr){
    if(arr.length === 1){
      return arr;
    }else{
      let middle = Math.floor(arr.length/2);
      let right = arr.slice(0,middle);
      let left = arr.slice(middle,arr.length);
      return mergeTime(mergeSort(right),mergeSort(left));
    }
  }
  
  let sortButton = document.querySelector("div.sort button");
  sortButton.addEventListener("click",()=>{
    //sort data
    let sortedArray = mergeSort(JSON.parse(localStorage.getItem("list")));
    localStorage.setItem("list",JSON.stringify(sortedArray));
  
    //remove data
    let len = section.children.length;
    for (let i = 0;i < len; i++){
      section.children[0].remove();
    }
  
    //load data
    loadData();
  })