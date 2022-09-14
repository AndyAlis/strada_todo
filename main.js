const list = [{id: 0, value: 'Позавтракать', status: 'todo', priority: 'high',}, {id: 1, value: 'Поработать', status: 'todo', priority: 'low',}, {id: 3, value: 'Проснуться', status: 'done', priority: 'high',}];
// const list = [];

const highInput = document.querySelector(".todo__high-text_input");
const lowInput = document.querySelector(".todo__low-text_input");
const highInputBtn = document.querySelector(".todo__high-add_btn");
const lowInputBtn = document.querySelector(".todo__low-add_btn");

const lowTasks = document.querySelector(".todo__low-tasks");
const highTasks = document.querySelector(".todo__high-tasks");


const tasksTemplate = document.querySelector("#maketask"); //select full template to make Node
const tasksTemplateInputCheckBox = tasksTemplate.content.querySelector('input'); //select <input type="checkbox"> to set id
const tasksTemplateLabel = tasksTemplate.content.querySelector('label'); //select label to set for =""
const tasksTemplateText = tasksTemplate.content.querySelector('.task-text'); //select div for text
const tasksTemplateDeleteBtn = tasksTemplate.content.querySelector('.delet-task'); //select delete button
const fullTaskDiv = 

//Enter for high tasks
highInput.addEventListener("keydown", (e) => {
   if (e.keyCode == 13 && highInput.value != "") {
      addTaskToList(Date.now(), highInput.value, 'high');  
      drawPage();
   }
});

//Click on '+' for high tasks
highInputBtn.addEventListener("click", () => {
   if(highInput.value != "") {
      addTaskToList(Date.now(), highInput.value, 'high');
      drawPage();
   } 
});

//Enter for low tasks
lowInput.addEventListener("keydown", (e) => {
   if (e.keyCode == 13 && lowInput.value != "") {
        addTaskToList(Date.now(), lowInput.value, 'low');
        drawPage();
   }
});

//Click on '+' for low tasks
lowInputBtn.addEventListener("click", () => {
   if(lowInput.value != "") {
      addTaskToList(Date.now(), lowInput.value, 'low');
        drawPage();
   } 
});


// add tasks on page from array 'list'

function drawPage() {
   //clear page
   lowTasks.innerHTML = '';
   highTasks.innerHTML = '';

   //iteration over tasks

   for (item of list) {
      
      //when draw page to put checkbox on task
      if(item.status === 'done') {
         tasksTemplateInputCheckBox.checked = true;
         tasksTemplate.content.querySelector(".task").classList.add("task-done");//???????????????????????????????????????????????????????????????????
      }
      else tasksTemplateInputCheckBox.checked = false;

      // tasksTemplate.setAttribute('data-task-id', item.id); //???
      tasksTemplateInputCheckBox.setAttribute('id', item.id); // set id of checkbox
      tasksTemplateLabel.setAttribute('for', item.id); // set attribute for label
      tasksTemplateDeleteBtn.setAttribute('data-number', item.id); //add user attribute to check what to delete
      tasksTemplateText.textContent = item.value; //add text of task
      

      let task = tasksTemplate.content.cloneNode(true);
      task.querySelector('.task').setAttribute('data-task-id', item.id);
      
      //add listener to delete right task
      task.querySelector('.delet-task').addEventListener("click", function () {
         deleteTaskFromList(Number(this.getAttribute('data-number')));
         drawPage();
      });

      //change status in array when change checkbox
      task.querySelector('input').onchange = function() {
         changeStatusInList(Number(this.getAttribute('id')));
         this.parentNode.classList.toggle("task-done");//?????????????????????????????????????????????
      };

      if (item.priority === 'high') {
         highTasks.append(task);
      }

      else if (item.priority === 'low') {
         lowTasks.append(task);
      }


   }

   highInput.value='';
   lowInput.value='';

   console.log(list);
}



// add task to array
function addTaskToList(id, value, priority) {
   let newTodo = {
      id: id,
      value: value,
      status: 'todo',
      priority: priority,
   };

   list.push(newTodo);
};

//delete task from array
function deleteTaskFromList(taskId) {
   let id = list.findIndex(item => item.id === taskId);
   if (id === -1) console.log(`There is no such task with name "${value}" to delete! Please check the name of task.`);
   else {
     list.splice(id, 1);  
   }
};

//change status of task in array
function changeStatusInList(value) {
   let taskIndex = list.findIndex(item => item.id === value);
   if (taskIndex === -1) console.log(`There is no such task with name "${value}" to change status! Please check the name of task.`);
   else {
     if(list[taskIndex].status === 'todo') list[taskIndex].status = 'done'
     else  list[taskIndex].status = 'todo';
   }
};


drawPage();