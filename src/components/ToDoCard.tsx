import Card from './Card';
import { TodoItem } from './TodoList';
import { Tag } from './ItemInput';
import React from 'react';

export default function ToDoCard(props: { item: TodoItem, onChange: (obj: TodoItem) => void }) {
    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        setComplete(!complete);
        props.onChange({ ...props.item, completed: !complete });
    }

    let [complete, setComplete] = React.useState<boolean>(props.item.completed);
    return (
        <Card key={Date.now()} smallMargin={true}>
            <div className="flex justify-between p-2">
                <div className="inline-flex">
                    <input onChange={handleCheck} type="checkbox" checked={complete} className="cursor-pointer form-checkbox opacity-0 absolute w-5 h-5"></input>
                    <div className="mt-0.5 rounded-sm bg-white border-2 border-gray-500 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500 transition-colors">
                        <svg className="fill-current hidden w-3 h-3 text-white-600 pointer-events-none" version="1.1" viewBox="0 0 17 12" xmlns="http://www.w3.org/2000/svg">
                            <g fill="none">
                                <g transform="translate(-9 -11)" fill="#FFF" fillRule="nonzero" >
                                    <path strokeWidth="10" d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z" />
                                </g>
                            </g>
                        </svg>
                    </div>
                    <h2 className="ml-2">{props.item.title}</h2>
                </div>
                <h2 className="text-sm mt-0.5">{props.item.dueDate.getMonth() + 1 + "/" + props.item.dueDate.getDate() + "/" + props.item.dueDate.getFullYear()}</h2>
            </div>
            <div className="flex flex-wrap justify-start max-w-full" >
                {props.item.tagList.filter(tag => tag !== "no-tags").map(tag => <Tag key={tag} name={tag} />)}
                {/* {props.item.tagList.map(tag => <Tag key={tag} onDelete={removeTag} name={tag} />)} */}
            </div>
        </Card>
    )
}