const input=document.querySelector(".inputEl")
const createBt=document.querySelector(".formli i")
const createPlace=document.getElementById("task")
const taskCount=document.querySelector(".taskcount")
const completedTask=document.getElementById("Completedtask")
let noOfTaskCount={
    value:0
}
//ADD - button
createBt.addEventListener("click",()=>{
    notEmpty(input.value);
})
//Function for Done task
const doneTaskEvent=function(checkBoxEl,noOfTaskCount,taskCount,taskList,taskName)
{
    checkBoxEl.addEventListener("click",(e)=>
    {
        removeApp(taskName)
        taskList.className+="completeanimation";
        checkBoxEl.style.cssText="background-color: #FF4500;"
        setTimeout((c)=>{
            taskList.remove();
        },1000)
        valueForNumberOfTask(noOfTaskCount,false)
        taskCount.textContent=noOfTaskCount.value;
  })
}
//Function for edit Input
const editInputFunction=function(taskName)
{
    taskName.addEventListener("click",(e)=>{
        const name=prompt("Enter task name:",taskName.textContent);
        if(name.length>15||name=="")
        {
            alert("Please Enter valid")
        }
        else
        {
            taskName.textContent=name;
        }
    })
}

function valueForNumberOfTask(countTask,boolean)
{
    let moreWork   
    if(boolean)
    {
        if(countTask.value===7){
        alert("Today you have a lot of Work...")}
        return countTask.value++;
    }
    else{
    countTask.value--;
        if(countTask.value==-1)return countTask.value=0;
        else
        return countTask.value;
    }
}

// input Field
input.addEventListener("keyup",(event)=>
{
    //Enter event to create task
    if(event.keyCode==13)notEmpty(input.value);
    //ctrl+z event to remove
    if(event.key=="z" && event.ctrlKey==true)input.value="";
})
//Function for removing List
const removeEvent=function(removeEl,noOfTaskCount,taskCount,taskList,taskName)
{   
        removeEl.addEventListener("click",(e)=>{
            removeApp(taskName)
            taskList.className+="removeanimation";
            setTimeout(()=>{
            taskList.remove();
        },1000)
        //Removing Task Count After removed list
        valueForNumberOfTask(noOfTaskCount,false)
        taskCount.textContent=noOfTaskCount.value;
    })
};
// Creating Lists
const creatingTask = function(valuetaskname)
{
    const taskList=document.createElement("div");
    let taskName=document.createElement("p");
    const checkBoxEl=document.createElement("span");
    const removeEl=document.createElement("i");
    //Adding Class name
    taskList.className="disflex listStyle ";
    //Adding Attribute
    removeEl.className="fa-sharp fa-solid fa-trash icon"
    checkBoxEl.className="aboutnavbar";
    //Adding input value
    taskName.textContent=valuetaskname;
    //creating i[] for storing children
    const i=[checkBoxEl,taskName,removeEl]
    //Appending through Loop
    for(let k=0;k<3;k++)
    {
        taskList.appendChild(i[k])
    }
    //Appending in Html page
    createPlace.prepend(taskList)
    //Adding TaskList number in h2     
    valueForNumberOfTask(noOfTaskCount,true)
    taskCount.textContent= noOfTaskCount.value;
    if(noOfTaskCount.value %2===0)
    {taskName.style.cssText="color:red;"}
    else{taskName.style.cssText="color:#fff;"}
    //Sending Button for Removing and Finished Events and Edit input
     removeEvent(removeEl,noOfTaskCount,taskCount,taskList,taskName);
     doneTaskEvent(checkBoxEl,noOfTaskCount,taskCount,taskList,taskName)
     editInputFunction(taskName)
     localStorage.setItem(
        "taskName",
        JSON.stringify([
            ...JSON.parse(localStorage.getItem("taskName")||"[]"),
            {
                taskname:valuetaskname},
            ])
     );
     //After Entered clearing the input
     input.value=""
}

// Creating Actions
const notEmpty=function(input)
{
    if(input!=""||null)
    {
        //checking Length<=15
        if(input.length<=15)creatingTask(input)
        else
        {
            alert("please make it short")
            input=""
        }
    }
    else
    {
        alert("Enter a task please...")
    }
}



document.addEventListener("DOMContentLoaded",()=>{
    
    let refreshData=JSON.parse(localStorage.getItem("taskName"));  
    refreshData.forEach((names)=>{
   
        const taskList=document.createElement("div");
        let taskName=document.createElement("p");
        const checkBoxEl=document.createElement("span");
        const removeEl=document.createElement("i");
        //Adding Class name
        taskList.className="disflex listStyle ";
        //Adding Attribute
        removeEl.className="fa-sharp fa-solid fa-trash icon"
        checkBoxEl.className="aboutnavbar";
        //Adding input value
        taskName.textContent=names.taskname;
        //creating i[] for storing children
        const i=[checkBoxEl,taskName,removeEl]
        //Appending through Loop
        for(let k=0;k<3;k++)
        {
            taskList.appendChild(i[k])
        }
        //Appending in Html page
        createPlace.prepend(taskList)
        //Adding TaskList number in h2     
        valueForNumberOfTask(noOfTaskCount,true)
        taskCount.textContent= noOfTaskCount.value;
        if(noOfTaskCount.value %2===0)
        {taskName.style.cssText="color:red;"}
        else{taskName.style.cssText="color:#fff;"}
        //Sending Button for Removing and Finished Events and Edit input
         removeEvent(removeEl,noOfTaskCount,taskCount,taskList,taskName);
         doneTaskEvent(checkBoxEl,noOfTaskCount,taskCount,taskList,taskName)
         editInputFunction(taskName)
    })   


    })  

const removeApp=function(taskName)
{
    const removeFromApp=[...JSON.parse(localStorage.getItem("taskName"))];
    removeFromApp.forEach((item)=>{
        if(item.taskname===taskName.textContent)
        {
            removeFromApp.splice(removeFromApp.indexOf(item),1);
        }
        localStorage.setItem("taskName",JSON.stringify(removeFromApp))
    })
}
