**Game Corner**
========================================================================================================================================

**Description:**

I am building a website for fans of videogames. Guests will come here to read the latest news and interact with each other in the "forums", where they may create posts, to review games, ask for help/tips, and have general conversation 

**User Stories**
========================================================================================================================================
The visitor may read news and posts, but may not create posts or leave comments.

The visitor will become a member by 'signing up' providing an email and password

A user will be able to visit their profile page, edit personal information; nickname, pw, profile pic. They will also be able to see their posts

A user will be able to create a post,  including image, title and content

A user will be able to leave comments on their own posts and posts belonging to others

A user will be able to reply to comments

**Feasability**
========================================================================
The basic functionality will be simple to implement and the videogame third party api's will cause no issue (free and provide relevant data).
The challenge will come from implementing the 'nice to haves/ stretch'. Since I will be using MongoDB/Mongoose it should not be difficult to update models if needed

**WireFrames**
=========================================================================================================================================

![Home](https://github.com/mariolm16/Game-Forum/blob/master/Home.png)
![Posts](https://github.com/mariolm16/Game-Forum/blob/master/Posts.png)
![Profile](https://github.com/mariolm16/Game-Forum/blob/master/Profile.png)

**ERD**
===================================================================================================================================

*const userSchema = mongoose.Scehma({
*name: {
*type:String,
*required: true
*}
*email: {
*type:String
*required: true
*}
*image: {
*type: String
*}
*username: {
*type: String, 
*unique: true,
*required: true
*}
*password:  {
*type: String,
*required: true,
*minlength: 8,
*}
*created: {
*type:Date.
*default: Date.now()
*}
*bio: String,
*posts: [{
*type: mongoose.Scehma.ObjectId,
*ref: 'Post'
*}]

*const postSchema = mongoose.Scehma({
*title: {
*type: String,
*required: true,
*created: {
*type:Date.
*default: Date.now()
*}
*image: {
*type: string,
*default: IMAGE LINK HERE
*}
*body: {
*type: String,
*required: true
*}
*})

*const commentSchema = mongoose.Schema({
*created: {
*type: Date,
*default: Date.now(),
 *},
  *body: {
    *type: String,
    *required: true,
  *},
  *username: {
    *type: String,
    *required: true,
  *},
  *author: {
    *type: mongoose.Schema.ObjectId,
    *ref: "User",
  *},
  *reply: [
    *{
      *type: mongoose.Schema.ObjectId,
      *ref: "Reply"
    *},
  *],
*});

*const replySchema = mongoose.Schema({
    *created: {
        *type: Date,
        *default: Date.now()
    *},
    *reply: {
        *type: String,
        *required: true
    *},
    *username: {
        *type: String,
        *require: true
    *},
    *comment: {
        *type: mongoose.Schema.ObjectId,
        *ref: "Comment"
    *}
*})

** Technology Used**
======================================================================

*Mongoose/MongoDB
*Node.js
*React
*Modal Package
*Moment Package