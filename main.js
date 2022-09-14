const highInput = document.querySelector(".todo__high-text_input");
const lowInput = document.querySelector(".todo__low-text_input");
const highInputBtn = document.querySelector(".todo__high-add_btn");
const lowInputBtn = document.querySelector(".todo__low-add_btn");


let id = 0;
const lowTasks = document.querySelector(".todo__low-tasks");
const highTasks = document.querySelector(".todo__high-tasks");

const tasksTemplate = document.querySelector("#maketask");
const tasksTemplateInput = tasksTemplate.content.querySelector('input');
const tasksTemplateLabel = tasksTemplate.content.querySelector('label');
const tasksTemplateText = tasksTemplate.content.querySelector('.task-text');



highInput.addEventListener("keydown", (e) => {
   if (e.keyCode == 13 && highInput.value != "") {
        addTask(id, 'high', highInput.value);
        id++;
   }
});

highInputBtn.addEventListener("click", () => {
   if(highInput.value != "") {
      addTask(id, 'high', highInput.value);
        id++;
   } 
});

lowInput.addEventListener("keydown", (e) => {
   if (e.keyCode == 13 && lowInput.value != "") {
        addTask(id, 'low', lowInput.value);
        id++;
   }
});

lowInputBtn.addEventListener("click", () => {
   if(lowInput.value != "") {
      addTask(id, 'low', lowInput.value);
        id++;
   } 
});




function addTask(id, status, text) {
   tasksTemplateInput.setAttribute('id', id);
   tasksTemplateLabel.setAttribute('for', id);
   tasksTemplateText.textContent = text;   

   let task = tasksTemplate.content.cloneNode(true);
   task.querySelector('.delet-task').addEventListener("click", function () {
      console.log("DElet!");
      this.parentElement.remove();
   })

   if (status === 'high') {
      highTasks.append(task);
   }

   else if (status === 'low') {
      lowTasks.append(task);
   }

   clearInputs();

}

function clearInputs() {
   highInput.value='';
   lowInput.value='';

}