/*-------------------dumy data*/
var data =[
  {id:1,
    content:'帶狗喝水',
  category:0,
  date:'2020-12-25',
  done:false,  
  },
   {id:2,
     content:'思維紀錄',
  category:1,
  date:'2020-12-25'  
  },
  {id:3,
    content:'帶狗喝水2',
  category:0,
  date:'2020-12-25',
  done:true,  
  },
    {id:4,
      content:'事件',
  category:2,
  date:'2020-12-25'  
  },

]
/*dumy data------------------------*/



const list = document.querySelector('#list')
const todo_views = document.querySelector('#todo_views')


/*---創建代辦事項、已完成、思維紀錄、事件區塊-----*/
const todo = document.createElement('div')
const done = document.createElement('div')
const ideas = document.createElement('div')
const event = document.createElement('div')

 todo.className='todo'
 todo.innerHTML=
    `<h3>代辦事項</h3>
    <ul id="todo_list">
    </ul>
      `
 done.className='done'
 done.innerHTML=
    `<h3>已完成</h3>
    <ul id="done_list">
    </ul>
    `

 ideas.className='ideas'
 ideas.innerHTML=
    `<h3>思維紀錄</h3>
    <ul id="ideas_list">
    </ul>
    `

  event.className='event'
 event.innerHTML=
    `<h3>事件</h3>
    <ul id="event_list">
    </ul>
    `



/*------------篩選-------------------------*/
/*-------------類別篩選------------------------------------------*/
var selectedCategory ='all'


const categorySelector = document.querySelector('#category_selector')
categorySelector.addEventListener('change', e=>{
   selectedCategory = e.target.value
   //呼叫changeCategory
  
   changeCategory (selectedCategory)
   viewChange(selectedCategory)

   //重新取得view的dom,並安裝addEventListener
   var todoViewCheck =  document.querySelector('#undoOrDone')
 if(todoViewCheck){
   todoViewCheck.addEventListener('change', e=>{
   todoViewChecker = e.target.value   
   
   //呼叫changeCategory
   changeTodoView (todoViewChecker)
   
});}
});

//將類別區塊插入list>>>依選擇條件插入

function changeCategory (selectedCategory){
if(selectedCategory =='all'){
  //清空list 
  list.innerHTML=''
  list.appendChild(todo)
  list.appendChild(done)
  list.appendChild(ideas)
  list.appendChild(event)
}else if(selectedCategory == 'todoList'){
  //清空list 
  list.innerHTML=''
  list.appendChild(todo)
  list.appendChild(done)
}else if(selectedCategory =='ideas'){
  //清空list 
  list.innerHTML=''
  list.appendChild(ideas)
}else if(selectedCategory =='event'){
  //清空list 
  list.innerHTML=''
list.appendChild(event)
}
}
//初始呼叫changeCategory
changeCategory(selectedCategory)
viewChange(selectedCategory)

/*-------代辦事項檢視模式選單的切換---------------------*/
function viewChange(selectedCategory){
  if(selectedCategory=='all' ||selectedCategory=='todoList' ){todo_views.innerHTML=` <legend>檢視</legend>
            <select id="undoOrDone" name="undoOrDone">
              <option value="all">ALL</option>
              <option value="undo">代辦</option>
              <option value="done">已完成</option>              
            </select>`        
             
             }
  else{
    todo_views.innerHTML=''
  }
}

/*-----切換檢視模式-------------------*/
var todoViewChecker = 'all'
var todoViewCheck =  document.querySelector('#undoOrDone')

todoViewCheck.addEventListener('change', e=>{
   todoViewChecker = e.target.value   
   
   changeTodoView (todoViewChecker)
   
});

function changeTodoView (todoViewChecker){
  if(todoViewChecker=='all'){  
  list.appendChild(todo)
  list.appendChild(done)   
}
else if(todoViewChecker=='undo'){
     list.removeChild(done)
    list.appendChild(todo)
   
    }
    else if(todoViewChecker=='done'){
     list.removeChild(todo)
      list.appendChild(done) 
      
    }
  }





/*--------------填入區塊內的資料----------------*/
//選取list section
const todoList = document.querySelector('#todo_list')
const doneList = document.querySelector('#done_list')
const ideasList = document.querySelector('#ideas_list')
const eventList = document.querySelector('#event_list')

function showList(){
  
  //清空之前的資料
if(todoList){
  todoList.innerHTML =``
  }
  if(doneList){
  doneList.innerHTML =``
  }
  
if(ideasList){
  ideasList.innerHTML =``
  }
if(eventList){
    eventList.innerHTML =``
  }


  data.forEach((item)=>{ 
 
  //判定todoList是否創建
   if(todoList){
      //加入todo     
  if(item.category == 0 && item.done == false){
    let todoItem = document.createElement('li')
    todoItem.className='todo_item'
    todoItem.innerHTML=
    `  <input type="checkbox" class="todo_check" name="todo_check" value=true > <span data-key='${item.id}'>${item.content}</span>  <button class='delete_btn' type="button">x</button>`
   
    todoList.appendChild(todoItem)
  
  }
  //加入done
  if(item.category == 0 && item.done == true){
    let doneItem = document.createElement('li')
    doneItem.className='done_item'
    doneItem.innerHTML=
    `  <input type="checkbox" class="done_check" name="done_check" value=false  checked> <span data-key='${item.id}'>${item.content}</span>   <button class='delete_btn' type="button">x</button>`
    doneList.appendChild(doneItem)
  }
   }
 
   //判定ideasList是否創建
   if(ideasList){
  //加入ideas
  if(item.category == 1){
    let ideasItem = document.createElement('li')
    ideasItem.className='ideas_item'
     ideasItem.innerHTML=
    `<span data-key='${item.id}' >${item.content}</span>   <button class='delete_btn' type="button">x</button>`
    ideasList.appendChild( ideasItem)
  }
   }
 
   //判定eventList是否創建
   if(eventList){
//加入event
   if(item.category == 2){
     let eventItem = document.createElement('li')
    eventItem.className='ideas_item'
     eventItem.innerHTML=
    `<span data-key='${item.id}'>${item.content}</span>   <button class='delete_btn' type="button">x</button>`
     eventList.appendChild( eventItem)
  }
   }
  
})

}


//初始時呼叫
showList()

/*----新增、刪除------*/
//刪除
list.addEventListener('click',e=>{
  //注意!!這裡是className 
  if(e.target.className =='delete_btn'){
    //從畫面上移除
    e.target.parentElement.remove()
    //從data中移除
    let dataKey =e.target.previousElementSibling.dataset.key   
     
    for(item in data){
       if(data[item].id == dataKey) {
       let result =  data.splice(item,1)
       console.log(result)
      }
    }
   
  }
})

//新增
const form =document.querySelector("#add_new_item_form")
const newCategory =document.querySelector("#new_catergory")
const newContent =document.querySelector("#new_content")

//初始id值
var id = 5 //由於dumydata已經預設到4，由5開始

form.addEventListener("submit",e=>{
  //防止預設反應
   e.preventDefault()
    //取得輸入值
   let  category = parseInt(newCategory.value)
   let content = newContent.value
  
   //新增資料    

   if (category == 0){
       var  newItem = {
         id:id,
        content: content,
  category:category,
  date:'2020-12-25',
  done:false,  
  }
   }
   else{
     var newItem = {
       id:id, 
      content: content,
  category:category,
  date:'2020-12-25',   
  }
   }   
    //編序下一個id值
   id+=1
   console.log(id)
   console.log(newItem)
    //加入data中
    data.push(
       newItem
    )

    //重新呼叫showList
    showList()
    
})


//-------------代辦事項與完成事項的變換------------------------//
//代辦---->>完成
list.addEventListener('click',e=>{
  //注意!!這裡是className 
  if(e.target.className =='todo_check'){       

    let dataKey =e.target.nextElementSibling.dataset.key  
       
     //在data中修改項目的done值
    for(item in data){
       if(data[item].id == dataKey) {
       data[item].done = true  
       }
    }
    showList() 

  }
})

//完成----->>代辦
list.addEventListener('click',e=>{
  //注意!!這裡是className 
  if(e.target.className =='done_check'){
  
    let dataKey =e.target.nextElementSibling.dataset.key  
     for(item in data){
       if(data[item].id == dataKey) {
       data[item].done = false      

      }
    }
    showList()
  }
})




