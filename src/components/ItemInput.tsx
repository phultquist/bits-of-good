import React, { MouseEvent, ChangeEvent } from 'react'
import Card from './Card';
import Input from './Input';
import { TodoItem } from './TodoList';

export function Tag(props: { name: string, marginT?: number, onDelete?: (e: MouseEvent<HTMLButtonElement>) => void }) {
    return (
        <div className={`flex bg-blue-100 rounded-md ${props.onDelete ? "px-3" : "px-4"} py-2 mx-1 mt-${props.marginT?.toString() || "4"} text-gray-600`}>
            {props.onDelete ? <button onClick={props.onDelete} className="mr-2">&times;</button> : null}
            {props.name}
        </div>
    )
}

export default function ItemInput(props: { onSubmit: (item: TodoItem, id: number) => void }) {
    const addTag = (e: MouseEvent<HTMLButtonElement>) => {
        let adjustedName = tagName.toLowerCase();
        if (!(!adjustedName || tags.includes(adjustedName))) {
            e.preventDefault();
            setTags([...tags, adjustedName]);
        }
        setTagName("");
    }

    const removeTag = (e: MouseEvent<HTMLButtonElement>) => {
        setTags(tags.filter(tag => tag !== e.currentTarget.parentElement?.childNodes[1].textContent));
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTagName(e.currentTarget.value);
    }

    // const validate = (items: string[]) => items.every(item => item.length > 0 && item !== null);
    const validate = (items: string[]): boolean => items.every(item => item.length > 0 && item !== null);

    const [tags, setTags] = React.useState<string[]>([]);
    const [title, setTitle] = React.useState<string>('');
    const [date, setDate] = React.useState<string>('');
    const [tagName, setTagName] = React.useState<string>('');

    return (
        <Card>
            <form>
                <div className="pt-2">
                    <p className="float-left my-2">Title</p>
                    <Input value={title} onChange={(event) => setTitle(event.currentTarget.value)} />
                </div>
                <div>
                    <div className="w-full h-8 mt-4">
                        <p className="float-left">Tags</p>
                    </div>
                    <div className="relative text-gray-700">
                        <Input onChange={handleChange} value={tagName} />
                        <button disabled={!(tagName.length > 0 && tagName !== null)} onClick={addTag} className="transition-opacity disabled:opacity-50 absolute h-10 bottom-0 inset-y-0 right-0 flex items-center px-4 font-bold text-white bg-blue-500 rounded-r">
                            Add
                        </button>
                    </div>
                    <div className="flex flex-wrap justify-start max-w-full" >
                        {tags.map(tag => <Tag key={tag} onDelete={removeTag} name={tag} />)}
                    </div>
                </div>
                <div className="w-full mt-2">
                    <p className="float-left my-2">Due Date</p>
                    <Input type="date" value={date} placeholder="mm/dd/yyyy" onChange={(event) => setDate(event.currentTarget.value)} />
                </div>
                <div className="w-full mt-2">
                    <button onClick={() => {
                        if (validate([title, date])) {
                            const newItem: TodoItem = {
                                id: Date.now(),
                                title: title,
                                tagList: tags,
                                dueDate: new Date(date),
                                completed: false
                            }
                            setTitle('');
                            setDate('');
                            setTags([]);
                            props.onSubmit(newItem, Date.now());
                        }
                    }} disabled={!validate([title, date])} className="transition-opacity w-full bg-blue-500 rounded text-white font-bold p-2 my-4 disabled:opacity-50">Create</button>
                </div>
            </form>
        </Card>
    )
}
