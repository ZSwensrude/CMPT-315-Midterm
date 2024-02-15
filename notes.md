# Midterm app
- do not need to create new courses through the application, assume that its just for students (students cant create courses)
- make the courses directly to mongo
- needs to be for multiple students, not just 1
- dont need to create the user - but have an endpoint (url) to create a user - dashboard for that would be nice
- only care about the interaction of adding and dropping users
- dont need to filter by time
- at the end of the day, just enrolling and unenrolling
- functionality of letting multiple users enroll in the same class
- user a enrolls in class, user b enrolls in same class
- student has list of courses they have enrolled in 
- student info can be different page
- switch users easy - need to manage users, but method doesnt matter
- time conflicts - only need to check start date, to go above and beyond, add start and end checking
- main functionality - two students enrolling in multiple classes, with the classes showing up in their list
- conflict needs to make it so you cant enroll in the course
- error handling must give correct reason - different messages for different errors
- two collections/tables - classes and students


- can make it all in one repo - two folders one for fe one for be - might make it hard to deploy but allowed
- ** ONLY DEPLOY AFTER SUNDAY MIDNIGHT **
- document code with comments to prove its your end
- app folder with folders for frontend and backend
- add chen to the repo - he will check commit history to make sure you didnt commit more after the due date
- assume we cant deploy it - make code private, then after the submission deadline we can deploy it
- day of week doesnt matter 



- 2 models one for course one for student



- course table should have a list of students enrolled
- student could have a list of courses they are in, but prolly shouldnt so theres only a single source of truth



- demo at front of entire class 
- dont need to show up for other people's presentations


## React Query
- isPending
- isLoading
- isFetching
- error messages
- https://tanstack.com/query/latest/docs/framework/react/examples/basic


## NOTES: 
- serializers are django, dont need them
- for the demo, pretend you are giving a pitch you are selling to an end user, not just handing in an assignment
- get it done in less than 20 hours :)
- you can implement react-query if you wanna


### Useful Pages
- https://www.bezkoder.com/mongodb-many-to-many-mongoose/
- https://aykutsarac.medium.com/how-to-implement-many-to-many-relationship-in-mongodb-with-examples-537d22f6e26a

