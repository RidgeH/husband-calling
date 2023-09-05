Design Doc for WDB Backend Technical Project Fa '23 - Husband Calling 
By: Ridge Huang

Why did you choose to organize your data schemas/models in a particular way?

The project essentially boiled down to different aspects of the same 'contestants' structure, so I knew I needed to create a skeleton model for each contestant. Thus, I chose to use Mongoose, an Object Data Modeling (ODM) library for MongoDB, to take advantage of its schema-based abstractions to construct my contestants. I also wanted to keep my files separate because they have different functions to improve clarity and to make debugging in the future easier. 
For the rest of my tasks, I decided to use Express JS as my framework as it simplifies a lot of tasks: namely route definitions, body parsing and error handling.  
I used async/await instead of traditional promise catching with .then and .catch mainly for readability (.then and .catch can have risks of becoming too convoluted with nested promise chains), but also to take advantage of try/catch blocks for error handling. Additionally asynchronous code made sense for database queries, which I utilized heavily in contestant.find() and contestant.save(). 
The concept of middleware was extremely help in my design. Instead of having to manually parse through the data stream from the request, express.json() automatically parses the data and attaches the data to the 'req.body' object neatly for me. 

Feel free to talk a bit about the "harder" routes that you have worked on and how you approached them. 

For me in coding, and honestly a lot of aspects of my life, I always have a hard time starting (maybe this is why I procrastinate so much). But in this instance I wasn't being lazy, it just took me deliberating for a couple hours to decide what libraries and frameworks to use. I started off basic with the http module in Node, but quickly leaned towards Express. Once I figured out to use mongoose.Schema as my data structure as well as parsing throught the json requests neatly using express.json(), the rest of the project came a lot easier to me. 

How did you decide on certain response codes or errors?
Errors should be as descriptive as possible to let users understand what went wrong. As such, I utilized 5 status codes throughout my methods for different scenarios. 
201: To indicate that a request has succeeded, I used this code when I was registering contestants to indicate when a new contestant has successfully been added to the database. 
400: To indicate that there is something wrong with the client's request. In this project, I utilized it when there is an issue registering a contestant (maybe the syntax is wrong, or a required field is missing) or when the vocal range is less than the location. 
404: To indicate that the requested data could not be found. In this project, I utilized it when a requested contestant could not be found in the database, meaning that contestant hasn't been registered. 
500: Umbrella catch, I used this just in case something ever went wrong when dealing with the database or processing data. 







