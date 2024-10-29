

document.addEventListener("DOMContentLoaded" , ()=>{
   const stordTasks = JSON.parse(localStorage.getItem('tasks'))

   if(stordTasks){
  stordTasks.forEach((task)=> tasks.push(task))
  updateTasksList()
  updateStats()
   }
 })
 let tasks = [];

 const saveTask = ()=>{
localStorage.setItem("tasks", JSON.stringify(tasks))
 }

 const addTask = ()=>{
  const taskInput = document.getElementById('taskInput');
  const text = taskInput.value.trim();

  if (text){
   tasks.push({text: text, completed: false});
   taskInput.value = ""
   updateTasksList()
   updateStats()
   saveTask()
}
 };
  const toggleTastComplet = (index) => {
   tasks[index].comleted =!tasks[index].comleted
   updateTasksList()
   updateStats()
   saveTask()
  }
const deleteTask = (index) => {
   tasks.splice(index, 1)
   updateTasksList()
   updateStats()
   saveTask()
}
 const editTask = (index) => {
   const taskInput = document.getElementById('taskInput')
   taskInput.value = tasks[index].text
   updateStats()
   saveTask()

   tasks.splice(index, 1)
   updateTasksList()
 }
 const updateStats =()=>{
   const completeTasks = tasks.filter(task=> task.comleted).length
   const totalTasks = tasks.length
   const mainbar = (completeTasks/totalTasks)*100
   const todobar = document.getElementById("mainbar")

   todobar.style.width = `${mainbar}%`

   document.getElementById('number').innerHTML = `${completeTasks} / ${totalTasks}`

   if(tasks.length && completeTasks === totalTasks){
      allBlast()
   }
 }

 const updateTasksList = () =>{
   const taskList = document.getElementById("task_list")
   taskList.innerHTML = "";
  
   tasks.forEach((task, index) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
      
      <div class="taskItem">
      <div class="task ${task.comleted ? 'completed':""}">
         <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}/>
         <p>${task.text}</p>
      </div>
      <div class="incon">
         <img src="./Images/edit.jpg" alt="Edit" onclick="editTask(${index})"/>
         <img src="./Images/images1.png" alt="Delite"  onclick="deleteTask(${index})"/>
      </div>
   </div>
   
      `;
  listItem.addEventListener('change' , ()=> toggleTastComplet(index))
  taskList.append(listItem)
      
      
   })
 } 

 document.getElementById('newTask').addEventListener('click' , function(e){
  e.preventDefault()
  addTask();
 });   
 
 

 const allBlast = ()=>{
   const defaults = {
      spread: 360,
      ticks: 50,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      shapes: ["star"],
      colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
    };
    
    function shoot() {
      confetti({
        ...defaults,
        particleCount: 40,
        scalar: 1.2,
        shapes: ["star"],
      });
    
      confetti({
        ...defaults,
        particleCount: 10,
        scalar: 0.75,
        shapes: ["circle"],
      });
    }
    
    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
 }