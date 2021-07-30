//creating variables by fetching all elements (classe and ids) using query selector
const form = document.querySelector('#itemForm');
const itemInput = document.querySelector('#itemInput');
const itemList = document.querySelector('.item-list');
const clearButton = document.querySelector('#clear');

let todoItems = []; //creating an empty array

const handleItem = function(itemName){//creating new function for tasks inputs

    const items = itemList.querySelectorAll('.item');//fetching item from added from innerHTML
 
    items.forEach(function(item){//The forEach() method calls a function once for each element in an array, in order.
        
        //The textContent property returns the text with spacing, but without inner element tags.
        
        //The document.addEventListener() method attaches an event handler to the document
        
        //complete event listener 
        if(item.querySelector('.item-name').textContent === itemName){
            item.querySelector('.complete-item').addEventListener('click', function(){
                item.querySelector('.item-name').classList.toggle('completed');
                this.classList.toggle('visibility');
            });
        //edit event listener
            item.querySelector('.edit-item').addEventListener('click', function(){
                itemInput.value = itemName;
                itemList.removeChild(item);
                todoItems = todoItems.filter(function(item){
                    return item !== itemName;
                });
            });
        //delete event lister to remove 
           item.querySelector('.delete-item').addEventListener('click', function(){
                itemList.removeChild(item);
                todoItems = todoItems.filter(function(item){
                    return item !== itemName;
                });
               
            })
        }
    })
    }

    const removeItem = function(item){//function to remove items
    //console.log(item);
    const removeIndex = (todoItems.indexOf(item));
    //console.log(removeIndex);
    todoItems.splice(removeIndex, 1);//The indexOf() method returns the position of the first occurrence of a specified value in a string. This method returns -1 if the value to search for never occurs.
        
    //The splice() method adds/removes items to/from an array, and returns the removed item(s).
}

const getList = function(todoItems){
    itemList.innerHTML = '';
        todoItems.forEach(function(item){////The forEach() method calls a function once for each element in an array, in order.
            itemList.insertAdjacentHTML('beforeend', `
            <div class="item">
                <p class="item-name">${item}</p>
                <div class="item-icons">
                <a href="#" class="complete-item item-icon"><i class="fas fa-check"></i></a>
                <a href="#" class="edit-item mx-2 item-icon"><i class="fas fa-pen"></i></a>
                <a href="#" class="delete-item item-icon"><i class="fas fa-trash-alt"></i></a>
                </div>
            </div>`);
            //The insertAdjacentHTML() method inserts a text as HTML, into a specified position.

            //Legal position values are:

            /*"afterbegin"
            "afterend"
            "beforebegin"
            "beforeend"*/
            handleItem(item);
        });
}

const getLocalStorage = function(){//parse items to local storage

    const todoStorage = localStorage.getItem('todoItems');//The getItem() method returns value of the specified Storage Object item.
    if (todoStorage === 'undefined' || todoStorage === null){
        todoItems = [];
    } else {
        todoItems = JSON.parse(todoStorage);
        getList(todoItems);
    }
}

/*setItem(): Add key and value to localStorage
getItem(): This is how you get items from localStorage*/

const setLocalStorage = function(todoItems){
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
}

getLocalStorage();


form.addEventListener('submit', function(e){ 
    e.preventDefault();//The preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.
    const itemName = itemInput.value;
    
    if (itemName.length === 0){//I think I must add Bootstrap elements
        feedback.innerHTML = '';//add element for bootstarp
        feedback.classList.add('showItem', 'alert-danger');
        setTimeout(
            function(){
                feedback.classList.remove('showItem');
                }, 3000);
    } else {
        todoItems.push(itemName);
        setLocalStorage(todoItems);
        getList(todoItems);
    }
    itemInput.value = '';

    });

clearButton.addEventListener('click', function(){//clear items from local storage
    todoItems = [];//empty array
    localStorage.clear();//clearing list
    getList(todoItems);
});








