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
8. Save a row. This also returns a Promise object. Handle that Promise object.


Chapter 1 - Define user requirements, Initialise npm and git
1. Create definition of a Minimum Viable Product
2. Write features in future process
3. Map Business Cycle to a User Experience Cycle on website
4. Create a Database - Sheets with Columns
5. Add rows for Validations and Conditions
6. Create User Flow based on Screens
7. Write Queries based on Screens and User Roles
8. Initialise npm and git