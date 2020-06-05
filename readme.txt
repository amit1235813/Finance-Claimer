Chapter 33 - Created signup features. User can verify email and create password.
1. Created login page with register button
2. To register, email is verified first
3. Created a GET API to verify if email exists
4. Display password creation form if email exists
5. Created a PUT API to add password
6. Modified User Model
7. If password is created, move to page displaying Users list
8. Saved user role and id in local storage
9. Created a logout button which delted user role and id, and moves to login page

Chapter 32 - Refactored JavaScript files to make the code modular based on SRP
1. Refactored Users JS files into a folder
2. Separated JS files for Event Listeners, API, creating DOM elements
3. Deleted JS files for router and components
4. Added CSS for homepage
4. Added options while connecting to MongoDB to remove deprecation warnings.

Chapter 31 - Refactoring Users API HTML files
1. Merged simple-html-branch with master before deploying to Heroku in last Chapter
2. Refactored code to move all HTML files related to Users in a folder
3. Changed links in HTML files
4. Changed links in JS files
5. Tested all 5 User API


Chapter 30 - Fix bugs for Edit User form
1. Bug fix: Hide Bank Details for certain users
2. Bug fix: Bank details cannot be empty for certain users
3. Detect chang ein user role to toggle bank details display
4. Clean code for Create User Form based on above
4. Deploy to Heroku and Vercel

Chapter 29 - Added Bank Details validation to Create User Form
1. Installed async-express-errors to run try ctach on all CRUD functions
2. Installed Winston to log errors in a file
3. Commented out above code
4. Documented HTML and JS code. Created a Flowchart to understand in Diagrams.
5. Added bank detail removal for certain users in create user form
6. Bug fix: Do not allow certain users to be created if bank details are empty

Refactored the code to simple HTML or VanillaJS - Chapters 22 to 28
Created API and frontend to view all users, view single user details,
create new user, edit a user and delete a user

Chapter 28 - Deploy Simple HTML with Users API and frontend
1. Commit changes
2. Deploy to Heroku
3. Deploy to Vercel

Chapter 27 - Created Delete user API and integrated with frontend
1. Created API to delete user by ID
2. Created Delete button for each user when User List is created in DOM
3. When delete button is clicked, ask for confirmation
4. Parse user name to send as query parameters
5. Delete user based on first name and last name

Chapter 26 - Integrated Edit User frontend with backend API
1. Changed submit method to click - prevents URL change
2. Send request to edit user
3. Changed deprecated mongoose settings globally - called useFindAndModify
4. If editing is successful, show alert and redirect to users list
5. If editing failed, show alert and stay on page

Chapter 25 - Created Edit User Form with events
1. Edited Joi to allow for bank details for specific users
2. Created find by ID and update API for user
3. Tested via Postman
4. Created edit user form
5. Parsed response object to values in edit user form
6. Created listeners to detect change, sumbit and formdata events for Edit User Form.

Chapter 24 - GET user details response object
1. Wrap user list in links
2. When link is clicked, parse the text content and add to URL
3. When new page loads, get the seacrh parameters
4. Use the seacrh parameters in GET a specific user request
5. Returns a response object with user details

Chapter 23 - Refactor frontend of View Users API
1. Created users HTML file to view user list
2. Incorporated CSS folder in Express static folder
3. Sent HTTP request and received response
4. Display received response as list

Chapter 22 - Refactoring the code in simple HTML (New Branch)
1. Moving to branch simple-html-branch
2. Angular and even Vue is too heavy
3. Creating own Router, Mutation Object, Data Binding is heavy JavaScript
4. Creating each HTML element is JavaScript is time consuming
5. Create simple index HTML file with CSS attached

Framework Simulation is Vanilla JS - Chapters 16 to 21
Routing, Template Literals, Mutation Observers, Event Targetting and Data Binding

Chapter 21 - Display received user details as HTML
1. Get user object without MongoDB version key
2. Create a list using the object with edit buttons
3. Data binding created for JS objects with list elements
4. Duplicate user list is not created if list already exists
5. When edit button is clicked, hide text and show input element

Chapter 20 - Used data binding of JS objects to DOM elements to send a single user GET request.
1. When user list is created, wrap that in a href link with an href attribute
2. Assign the required properties to the DOM elements
3. Use these properties to create a request object
4. When the link is clicked, send request to view the user details

Chapter 19 - Display users list either when link is clicked or a URL is loaded
1. When Users link is clicked, display user list
2. Parse response array and display name as list items
3. When directly users URL is loaded, wait for component to render
4. Used Mutation Observer to wait for component to render
5. Once component is rendered, append users list

Chapter 18 - Used Event Targetting to attach events to dynamically created DOM elements,
Created API function to get all users
1. Get all users and sort them by first name
2. Show only specific properties of user
3. Made a link to create new user
4. Uploading Create User Form via Template Literal
5. Attached events to dynamically created DOM objects via Event Targetting
6. Event Targetting is used to listen on event on the parent
7. Used change, submit and formdata event

Chapter 17 - Added a router and for high performance
1. Refined code for current user role
2. Created components to be display when a sidebar item is chosen
3. Components are stored as Template Literals
4. Created a router which displays these components without loading the whole page again
5. Router matches hashed paths with components
6. Finds the current path on load or hash change
7. Finds the corresponding component and loads it in the DOM

Chapter 16 - Created current user variable. Created 9 users.
1. Created variable to define current user
2. Made create user form invisbile for certain users
3. Made the form able to submit whilce creation of certain users
4. Removed Joi validation of Bank details
5. Removed form elements for bank details in request body - where not required
6. No need to change any URL in prod - frontend, Express or MongoDB

Deployment - Chapter 14 and 15

Chapter 15 - Deploy to Heroku post App crash
1. URL need to be changed at 3 places
2. MongoDB where databse is being created
3. Express Port where requests are being listened to
4. Frontend URL being used to send requests - no slash in beginning
5. White list all IP addresses in MongoDB
6. Use absolute path for the folder to be on the safe side
7. Tested deploy on Vercel server.
8. Changed name of library from @hapi/Joi to @hapi/joi - This was crashing the app.
9. Created alert for Prod to get confirmation of user creation.

Chapter 14 - Deploy to Heroku
1. Install and use Helmet - Adds security headers in HTTP response
2. Install and use Compression - Reduces size of response objects sent to client
3. Check if Heroku is installed/Install Heroku
4. Login to Heroku
5. Add npm start and node and npm engine for reference of Heroku
6. Move nodemon to dev dependencies. Although, developmnet environment flag has not been created.
7. Steps post commit - Create remote URL in Heroku. Push to remote URL.

Refine HTML form - Chapter 11, 12 and 13

Chapter 13 - Frontend form validation in HTML
1. All validation done using HTML input atrributes
2. No JS used
3. Attributes used - required, autofocus, minlength, maxlength, type, pattern for regex

Chapter 12 - Run both backend and frontend from the same port
1. Run index html from the same port as backend code
2. Tested creation of a user
3. Tested user creation without CORS
4. Uninstalled CORS

Chapter 11 - Bank details not needed for certain users
1. Added condition for Field or Sheet Columns before saving in the API
2. Did not add Joi validation - its a condition
3. Remove Form Fields in HTML if value is of a certain type

Refine Express API - Chapter 9 and 10

Chapter 10 - Trim response with Lodash
1. Corrected Joi regex validation
2. Installed Lodash
3. Used pick method to filter out properties of the response object

Chapter 9 - Add Joi Validation
1. Install @hapi/joi library for validation of request body
2. Create validation rules in the Model
3. Return error object
4. Export validation function to the request handling API function
5. If error is there, return syntax error in request - called 400

HTML Form Integration - Chapter 7 and 8

Chapter 8 - Send request with HTML form and get response
1. Get the form data using the JS FormData method
2. Prevent default behaviour of form
3. Extract form data and convert ot JSON string
4. Send JSON string to API
5. Randomize API URL to prevent getting cached data already saved by browser for that API URL.
6. Set HTTP Headers to JSON. SImilar to changing data type to JSON in Postman.
7. When request status is OK and response is ready, log response
8. Install and enable CORS to make two ports talk to each other

Chapter 7 - Created a form to create a Team Mate
1. Added a last name in the Schema, Model, API and User requirement
2. Create a Bootstrap form
3. Created CSS and JS for it - some local and some from Bootstrap CDN
4. Mapped the fields to User Sheet

Express post API - Chapter 4, 5 and 6

Chapter 6 - Create API with a URL to send create user requests. Test on Postman.
1. Create an express router object in a new file
2. Created a post method on this router object
3. Extracted user details from the request object
4. Saved the user object to Database
5. Sent back a response
5. The Express string to JSON method for all paths is executed
6. The Express use method has a default path of '/'. Made this explicit
7. Installed nodemon to keep the server running on code changes
8. All Express API paths start with a slash

Chapter 5 - Refactor code to move out User Model
1. Move User model to a seaprate JS file
2. Require mongoose there
3. Export it
4. Import and test in index file

Chapter 4 - Create an Express server to listen on a port
1. Install Express
2. Import or require Express
3. Listen on a port
4. Send back a response to test

MongoDB - Chapter 1, 2 and 3

Chapter 3 - Creating Schema for User Collection. Using Schema Types. Using Schema Type Options which are functions known as validators.
1. Created User Schema
2. Used SchemaTypes of String and Number
3. Used Schema Type Options which are validator functions
4. For String, used uppercase, trim, match, enum, minlength and maxlength validation functions
5. Match function matches with a RegExp
6. Used require validation function with error handling
7. Unique option is not a validtor - uses the column to create unique IDs.
Its a MongoDB function
https://mongoosejs.com/docs/validation.html
https://docs.mongodb.com/manual/core/index-unique/


Chapter 2 - Install Mongoose. Learn about Database, Collection, Schema, Model, Document and Promises.
1. Install mongoose
2. Create gitgignore file and mention node_modules
3. Create Index JS
4. Import or require mongoose
5. Connect to Mongoose
6. This a returns a Promise object - handle the states of that Promise object
7. Create on Object Schema which is a Mongoose Class. MongoDB is Schema Less.
8. Connect Schema to a Model which is a JS object
9. Save a row. This also returns a Promise object. Handle that Promise object.


Chapter 1 - Define user requirements, Initialise npm and git
1. Create definition of a Minimum Viable Product
2. Write features in future process
3. Map Business Cycle to a User Experience Cycle on website
4. Create a Database - Sheets with Columns
5. Add rows for Validations and Conditions
6. Create User Flow based on Screens
7. Write Queries based on Screens and User Roles
8. Initialise npm and git