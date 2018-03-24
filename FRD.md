# Functional requirements

## Functionality
1. Register and log in to access profile page
2. On your profile page, see your accomplishments, assignmenst you need to work on, and feeds
3. Go to assignments page, browse assignments based on due dates, and sign up to work on assignments
4. On the page for each assignment where there's the due date, a list of other people who also signed up to work on it, and their submissions
5. For each submittal for each assignment, a list of comments and reactions from other users. The comment from the one who posted the assignment is the special comment that appear at the top.

The list of accomplishments include a list of all your submittals and stats on your submittals, such as number of reactions and list of comments and such.


## Authentication

### Redux States:

* `IS_LOGGED_IN`
* `LOGIN_SUCCESS`
* `LOGIN_FAILURE`
* `SIGNUP_SUCCESS`
* `SIGNUP_FAILURE`

Root = `/`

* If `IS_LOGGED_IN`, then you have access to the following routes:

	1. `/[username]`
	2. `/[username]/[area]/[project-name]`
	3. `/[username]/completed`
	4. `/[username]/completed/[area]`
	4. `/[username]/ongoing`
	5. `/[username]/ongoing/[area]`
	6. `/[username]/opportunities`
	7. `/[username]/opportunities/[area]`
	8. `/[username]/opportunities` 

## Components


### Auth

**`AuthBtn`**

* Social login

**`Form`**

* Login using email and password

**`login`*****

* Contains `AuthBtn`
* Contains `Form`
* Gets rendered in a modal or on a webpage


### Profile

**`topnav`**

* renders `logout` button, which should be a simple anchor.
* Contains an event to open `PushNotif`, which gets populated with data via isomorphic-fetch.
* Contains `profileImg`

**`PushNotif`**

**`profile`**

* renders three presentations of `ProjectList`
	* `completed` - which lists all the completed quests
	* `ongoing` - What you are working on currently
* 
* renders `deactivateAccount`

### Project

**`post`**

* Form to create a new project with the following attributes:
	- Deadline
	- Title
	- Detail
	- Skills and Knowledge Areas 

