# Functional requirements

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

