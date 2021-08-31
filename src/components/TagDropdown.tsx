import React, { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { Tag } from "./ItemInput";

const SelectableTag = (props: { name: string, selected: boolean, onClick: (e: React.MouseEvent<HTMLDivElement>) => void }) => {

    return <div onClick={(e) => {
        props.onClick(e);
    }} className={`max-h-14 border-b border-gray-200 flex justify-between pl-2 pr-4 py-2.5 font-normal hover:bg-gray-200 cursor-pointer ${props.selected ? "bg-gray-100" : "bg-white"}`}>
        {props.name === "no-tags" ?
            <span className="text-gray-600 ml-2 text-sm">no tags</span> :
            <Tag name={props.name} marginT={0} />
        }
        {props.selected ? <svg className="flex" viewBox="-4 0 30 24" width="10" xmlns="http://www.w3.org/2000/svg" ><path strokeWidth="3" stroke="black" d="M24 4.685l-16.327 17.315-7.673-9.054.761-.648 6.95 8.203 15.561-16.501.728.685z" /></svg> : null}
    </div>
};

const TagDropdown = forwardRef((props: { tags: string[], onChange: (selected: string[]) => void }, ref2) => {

    // when a new item is created, the tags need to be added to the list of selected tags
    useImperativeHandle(ref2, () => ({
        addSelected(tags: string[]) {
            tags.forEach(tag => {
                if (!selectedTags.includes(tag)) {
                    selectedTags.push(tag);
                }
            })
        }
    }));

    // pushes no tags to the bottom of the list
    if (props.tags.includes("no-tags")) {
        props.tags.splice(props.tags.indexOf("no-tags"), 1);
        props.tags.push("no-tags");
    }

    const [selectedTags, setSelectedTags] = React.useState<string[]>(props.tags);
    const [active, setActive] = React.useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const handleOutsideClick = (e: MouseEvent) => {
        if (ref.current && ref.current !== null && !(ref.current.contains(e.target as Node))) {
            setActive(false);
        }
    }

    const onChange = props.onChange;

    // calls onChange when the selected tags change
    useEffect(() => {
        onChange(selectedTags);
    }, [selectedTags, onChange])

    // closes window when clicking outside
    useEffect(() => {
        document.addEventListener('click', handleOutsideClick, true);
        return () => {
            document.removeEventListener('click', handleOutsideClick, true);
        };
    }, []);
    return (
        <div className="relative flex-grow">
            <button onClick={() => setActive(!active)} className={`hover:bg-gray-200 transition-colors font-bold px-4 py-2 rounded ${((selectedTags.length === props.tags.length) && !active) ? null : "bg-gray-200"}`}>
                {selectedTags.length === props.tags.length ? "All Tags" : (selectedTags.length + (selectedTags.length === 1 ? " Tag" : " Tags"))}
                <img className="inline h-4 mb-1 ml-1" alt="v" src="https://img.icons8.com/ios-glyphs/30/000000/expand-arrow--v1.png" />
            </button>
            <div className="w-full absolute">
                <div ref={ref} tabIndex={0} className={`${active ? null : "hidden"} overflow-scroll border min-w-md border-gray-200 bg-white rounded-lg shadow-2xl mx-8 max-h-96`}>
                    {props.tags.map(tag => <SelectableTag key={tag} name={tag} selected={selectedTags.includes(tag)} onClick={(e) => {
                        if (!selectedTags.includes(tag)) {
                            setSelectedTags([...selectedTags, tag]);
                        } else {
                            setSelectedTags(selectedTags.filter(t => t !== tag));
                        }
                    }} />)}
                </div>
            </div>
        </div>
    )
});

export default TagDropdown;