# Web Development Final Project - *Twittr*

Submitted by: **Faezaan Ansari**

This web app: **Allows users to create, update, delete, and like posts. Allows users to comment on posts and like comments. Users can sign up and log in. Users can attach images to posts. Users can get a randomly generated image (meme) to add to post.**

Time spent: **12** hours spent in total

## Required Features

The following **required** functionality is completed:


- [X] **Web app includes a create form that allows the user to create posts**
  - Form requires users to add a post title
  - Forms should have the *option* for users to add: 
    - additional textual content
    - an image added as an external image URL
- [X] **Web app includes a home feed displaying previously created posts**
  - Web app must include home feed displaying previously created posts
  - By default, each post on the posts feed should show only the post's:
    - creation time
    - title 
    - upvotes count
  - Clicking on a post should direct the user to a new page for the selected post
- [X] **Users can view posts in different ways**
  - Users can sort posts by either:
    -  creation time
    -  upvotes count
  - Users can search for posts by title
- [X] **Users can interact with each post in different ways**
  - The app includes a separate post page for each created post when clicked, where any additional information is shown, including:
    - content
    - image
    - comments
  - Users can leave comments underneath a post on the post page
  - Each post includes an upvote button on the post page. 
    - Each click increases the post's upvotes count by one
    - Users can upvote any post any number of times

- [X] **A post that a user previously created can be edited or deleted from its post pages**
  - After a user creates a new post, they can go back and edit the post
  - A previously created post can be deleted from its post page

The following **optional** features are implemented:


- [X] Web app implements pseudo-authentication
  - Users can only edit and delete posts or delete comments by entering the secret key, which is set by the user during post creation
  - **or** upon launching the web app, the user is assigned a random user ID. It will be associated with all posts and comments that they make and displayed on them
  - For both options, only the original user author of a post can update or delete it
- [ ] Users can repost a previous post by referencing its post ID. On the post page of the new post
  - Users can repost a previous post by referencing its post ID
  - On the post page of the new post, the referenced post is displayed and linked, creating a thread
- [ ] Users can customize the interface
  - e.g., selecting the color scheme or showing the content and image of each post on the home feed
- [ ] Users can add more characterics to their posts
  - Users can share and view web videos
  - Users can set flags such as "Question" or "Opinion" while creating a post
  - Users can filter posts by flags on the home feed
  - Users can upload images directly from their local machine as an image file
- [ ] Web app displays a loading animation whenever data is being fetched

The following **additional** features are implemented:

* [X] Users can update, like, and delete from feed view or detailedview
* [X] Home page greets user's username if logged in
* [X] Cannot like posts and comments or create new post unless logged in


## Video Walkthrough

Note for grader: Please click on the thumbnail or the hyperlink Twitter - 6 August 2025 - Watch Video To see the full .gif.

<div>
    <a href="https://www.loom.com/share/9ffcd48d20684a7c879f0d46a8b31721">
      <p>Twitter - 6 August 2025 - Watch Video</p>
    </a>
    <a href="https://www.loom.com/share/9ffcd48d20684a7c879f0d46a8b31721">
      <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/9ffcd48d20684a7c879f0d46a8b31721-b852074ac0bf1d70-full-play.gif">
    </a>
  </div>

  made with loom

## Notes

* No data is cached. Confusion on when to cache and when to call api. Slow load times!
* Slow update (e.g., creating a post or liking a post) times. Most likely client side although could also be supabase
* Re-querying ALL data when a single data is updated, inefficient
* Basic checking if account exists when signing up/logging in

## License

    Copyright [2025] [Faezaan Ansari]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.