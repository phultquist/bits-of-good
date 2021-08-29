# Introduction
Hello, thank you for showing your interest in Bits of Good! This semester, we are changing how we recruit devs. Instead of asking what flexbox and difference btwn let and var, we would like you to showcase your skills by actually coding out an app! We hope you enjoy the task and feel free to reach out to our email (hello@bitsofgood.org) if you have any questions! 

# Task
### Feature 1: Todo Form
1. Form should have input fields for title (a short description of todo item), tags (array of words describing todo item), and a due 
2. The user can create a tag via a text input field and "create tag" button
3. The user can view all created tags in the todo form in a list view 
4. The user can toggle each tag to delete them
5. The user can create a new todo item appear on the todo list section (feature 3)
6. The user cannot create a todo item when title and due dates aren't specified
7. The form should be cleared out after creating a new todo item (title text input field, tag list, tag input field, due date input field should be cleared after creating a new todo item)

### Feature 2: Sort Section
1. Sort section should have sort by date and sort by completed options
2. User can sort by date in increasing order by clicking on sort by date option (if todo item A has due date 8/28/2021 and todo item B has due date 9/1/2021, todo item A should appear before todo item B)
3. User can bring incompleted todo items to front and completed items to the back by clicking on sort by completed option 
4. If both buttons are toggled, items should be sorted by completedness first and each section, completed and incompleted, should be sorted by dates in increasing order
6. (Bonus) Implement a filter feature that filters the list of todo items based on tags. Tags should be displayed as dropdown and users should be able to select multiple tags from the dropdown. Note that this is a filter feature, so any todo items that does not contain the feature should not be displayed. Resetting filters should revert the array to previous state (display all items) 

### Feature 3: Todo List section
1. Todo list section should display todo items contained in a card
2. Each todo item card should have a title, a due date, and tags
3. The user can mark the todo completed by toggling the todo card
4. The toggled todo item should be visually explicit that the item is completed, either via including a checkbox or by graying out todo item card

#### Sample UI
![image](https://user-images.githubusercontent.com/39681900/128660900-8ea9ad4a-85e2-4f5f-afcd-2e9809ac9c9e.png)

# Assessment Rubric
