import React, { useEffect } from 'react'
import ItemInput from './ItemInput';
import TagDropdown from './TagDropdown';
import ToDoCard from './ToDoCard';

/**
 * Thank you for applying to Bits of Good. You are free to add/delete/modify any 
 * parts of this project. That includes changing the types.ts, creating css files, 
 * modifying import statements, using contexts, etc. We do recommend to keep it simple. 
 * You will not be judged based on complexity. We also recommend using 
 * multiple components instead of coding everything on this file :)
 * 
 * Have fun! Please reach out to hello@bitsofgood.org or wkim330@gatech.edu if you
 * have any questions!
 * 
 * Bits of Good Engineering Team
 * 
 */
// TODO: Start coding from here

// Here's a baseline todo item type. 
// Feel free to extend or create your own interface!
export type TodoItem = {
  id: number,
  title: string,
  dueDate: Date,
  tagList: string[],
  completed: boolean,
}

enum sortTypes {
  date = "sort-date",
  complete = "sort-complete"
}

export default function TodoList() {
  const [sortByDate, setSortByDate] = React.useState(false);
  const [sortByComplete, setSortByComplete] = React.useState(false);
  // Sample Data to make it easier for someone to view
  const [todoItems, setTodoItems] = React.useState<TodoItem[]>(
    [{
      id: 0,
      title: 'Do the Laundry',
      dueDate: new Date('January 17, 2022 00:00:00'),
      tagList: ["home", "low priority"],
      completed: false
    },
    {
      id: 1,
      title: 'Pick Charlie Up',
      dueDate: new Date('August 31, 2021 00:00:00'),
      tagList: ["high priority", "car"],
      completed: true
    },
    {
      id: 2,
      title: 'Replace Spare Tire',
      dueDate: new Date('September 17, 2021 00:00:00'),
      tagList: ["high priority", "car"],
      completed: true
    },
    {
      id: 3,
      title: 'Find a Movie',
      dueDate: new Date('December 17, 2021 00:00:00'),
      tagList: ["low priority", "home", "weekend"],
      completed: false
    },
    {
      id: 4,
      title: 'Buy Groceries',
      dueDate: new Date('January 16, 2022 00:00:00'),
      tagList: ["no-tags"],
      completed: false
    }]);

  const allTags = () => {
    return todoItems.length === 0 ? [] : removeDuplicates(todoItems.map(i => i.tagList).reduce((prev, next) => prev.concat(next)));
  }

  const [selectedTags, setSelectedTags] = React.useState<string[]>(allTags());
  const [currentItems, setCurrentItems] = React.useState<TodoItem[]>([]);


  const handleSortChange = (e: React.MouseEvent<HTMLButtonElement>): void => {
    // I've made one function to handle sorting, because in the case that more sorting methods were to be added, this would be much easier.
    let sortType = e.currentTarget.id;
    if (sortType === sortTypes.date) {
      setSortByDate(!sortByDate);
    } else if (sortType === sortTypes.complete) {
      setSortByComplete(!sortByComplete);
    }
  }

  function removeDuplicates<Type>(arr: Type[]): Type[] {
    let unique = arr.filter((item, index) => {
      return arr.indexOf(item) === index;
    });
    return unique;
  }

  // resorts/filters items any time any of the relating states change
  useEffect(() => {
    const sortAndFilterItems = (): TodoItem[] => {
      let filtered: TodoItem[] = [];
      selectedTags.forEach(tag => {
        filtered = filtered.concat(todoItems.filter(item => item.tagList.includes(tag)));
      })
      filtered = removeDuplicates(filtered);
      let sorted = filtered.sort((a, b) => a.id - b.id);
      if (sortByDate) {
        sorted = sorted.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
      }
      if (sortByComplete) {
        sorted = sorted.sort((a, b) => (a.completed ? 1 : 0) - (b.completed ? 1 : 0));
      };

      setCurrentItems(sorted);
      return sorted;
    }

    sortAndFilterItems();
  }, [todoItems, sortByDate, sortByComplete, selectedTags]);

  const dropdownRef = React.useRef<any>();

  return (
    <div className="p-10 bg-gray-100 min-h-screen w-screen">
      <h1 className="text-6xl	text-blue-500">Up Next</h1>
      <p className="text-sm text-gray-600 mt-4">A BITS OF GOOD APPLICATION</p>
      <div className="flex justify-center">
        <div className="w-full max-w-2xl">
          <div>
            <ItemInput onSubmit={(item) => {
              if (item.tagList.length === 0) item.tagList = ["no-tags"];
              setTodoItems([...todoItems, item]);

              // Adds the new item to the selected tags
              dropdownRef.current?.addSelected(item.tagList);
            }} />
          </div>
          {todoItems.length === 0 ? <p className="text-sm text-gray-600 mt-10">No Items</p> : <>
            <div className="flex justify-between px-4 text-sm font-bold text-gray-600">
              <button onClick={handleSortChange} id={sortTypes.complete} className={`transition-colors font-bold px-4 py-2 rounded ${sortByComplete ? "active" : null}`}>Group Completed</button>
              <TagDropdown ref={dropdownRef} tags={allTags().sort((a, b) => {
                if (a < b) { return -1; }
                if (a > b) { return 1; }
                return 0;
              })} onChange={(selected: string[]) => {                
                setSelectedTags(selected);
              }} />
              {/* <button onClick={() => }>test</button> */}
              <button onClick={handleSortChange} id={sortTypes.date} className={`transition-colors font-bold px-4 py-2 rounded ${sortByDate ? "active" : null}`}>Sort By Date</button>
            </div></>}
          <div>
            {currentItems.length === 0 ? <p className="text-sm text-gray-600 mt-10">No Items</p> : currentItems.map((item) => {
              // console.log("building", todoItems, selectedTags);
              return (
                <ToDoCard key={item.id} item={item} onChange={(obj: TodoItem) => {
                  setTodoItems(todoItems.map((todo) => {
                    return todo.id === obj.id ? obj : todo;
                  }))
                }} />
              )
            })}
          </div>
          <div>
            <p className="my-2 mt-14 text-sm text-gray-600">BY PATRICK HULTQUIST</p>
          </div>
        </div>
      </div>
    </div>
  )
}