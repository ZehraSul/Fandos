# Fandos Web App

## Table of contents

**[System Architecture Overview](#_34jcbxtppsl8) 2**
[MongoDB:](#_gt24dbmeqjx9) 2
[Express/NodeJS](#_qw17cdc9lewf) 2
[React](#_epa1h7ytetwo) 2

**[Deployment](#_fo8a1bsne8tv) 3**
[Speed:](#_cem4hpef858n) 3
[Agility:](#_y2jj9nyoefm) 3
[Scalability:](#_b8fdls21wi8j) 3

**[React Framework](#_9lr1hkx3491s) 3**
[Speed:](#_8eufmayosm) 3
[Deployment:](#_lpexatkgd5yh) 3
[SEO:](#_k1xqrers6mo) 3

**[Styling](#_e0irbdyt3vwd) 4**
[Bootstrap:](#_bjzm7bng61fv) 4
[CSS:](#_spto4d9jrtbd) 4

**[System Requirements Specification](#_c68ig0xky167) 5**
[Overview](#_6sy0vmpig895) 5
[Competitors](#_w69rflrvtgn5) 5

**[Functional requirements](#_p44fjp7yfipv) 5**
[User can:](#_2hvl3vv176kr) 5
[Admin user can:](#_h41nu2myb6an) 6

**[Non functional requirements](#_137ae6jorr74) 6**
[Scalability:](#_gs545wo2blor) 6
[Reliability:](#_qjzkg6mblglf) 6
[Performance:](#_33u9pvwqcyw6) 6
[Security:](#_6krnohu0qsmx) 6
[Accessibility:](#_ldvbr4f38uzz) 6
[Compatibility:](#_2qx4w5momdff) 6

**[User Stories](#_g844u01plo2v) 7**

## System Architecture Overview

The app will be developed using the MERN stack.

### MongoDB:

- Cheaper than alternatives
- Easy to maintain
- Quicker to develop
- Easy to scale out
- Schemaless which will be necessary for our evolving needs

### Express/NodeJS

- Provides useful features for web and mobile applications
- Short development time
- Helpful with routing
- Helmet for added security
- Passport for authentication strategies

### React

- Popular framework
- Lots of support
- Virtual DOM makes web pages fast and responsive

## Deployment

The app will be deployed on heroku.

### **Speed** :

- The process is quick and clear.
- Requiring very little upfront setup time.

### **Agility** :

- Automatic deployment will help keep the app current.
- Deploying changes as they are pushed will result in less downtime.

### **Scalability** :

- Automatic scaling will allow us to handle traffic surges during peak hours, weekends and public holidays.

## React Framework

We will be using CRA.

### **Speed** :

- Client side rendering will give users a quick results.

### **Deployment** :

- CRA is quick and easy to setup both backend and frontend on heroku

### **Development Time** :

- well known, quick to set up and configure. Stuctured layout fro the start.

## Styling

We will be using bootstrap and CSS.

### **Bootstrap** :

- To speed up the development.
- Add uniformity
- Give a familiar but modern look
- Responsiveness is a plus when app will be viewed on multiple device types

### **CSS** :

- For customising finishes

## System Requirements Specification

## Overview

The application will allow the end user to register for an account. Once they have an account they can log in and immediately select items to add to their cart then review their cart to confirm their choices and place the order.

The app will target everyone as end users.

End users will benefit from ease of use. The process from new user to customer is near effortless.

## Competitors

There are a number of competitors in the market now. Our main goal is to use ease of ordering and speed to sway the end user's choice.

Speed is the make or break component when it comes to the end user. How fast we can get them from hungry to order placed will determine the success of the app. The app will be stylish but with a priority placed on load times. No unnecessary animations or clicks.

The process from start to end should be no more than "number of items ordered" + 3 clicks. The option to repeat the user's favourite order is just 3 clicks away in total after logging in.

## Functional requirements

### User can:

- Register using email and password
- Register using Facebook or Google
- Login
- See menu
- Click add button next to menu item to add that item to the cart
- Click on Order History button to view order history
- Click on cart to see items currently added to cart
- Remove one item from cart
- Remove all items from cart
- Place order for items in cart
- See their total for order

### Admin user can:

- Login using assigned username and password
- Remove item from the menu
- Add new items to the menu

## Non functional requirements

### **Scalability** :

- Handle 1000 users logged in at a time
- Have surge capacity to handle 3000 users

### **Reliability** :

- Down for max of 10 minutes a day
- Down for max of 2 minutes during peak hours

### **Performance** :

- Requests should be processed within 3 seconds
- Site should load within 3 seconds

### **Security** :

- User should be able to change password with email verification
- User password should be secured using best industry practices.

### **Accessibility** :

- Have large easy to read text
- Large obvious buttons
- Images must have alt tag to support screen readers

### **Compatibility** :

- Must have the same features across all operating systems

## User Stories

| Title: Order item | Priority: | Estimate: |
| ----------------- | --------- | --------- |

| User Story:
| As a user, I want to click an item so I can order it
| Acceptance Criteria:
| Given I am logged in I can click on the "Add" button to add that item to my cart |

| Title: Cart | Priority: | Estimate: |
| ----------- | --------- | --------- |

| User Story:
| As a user, I want to see all the items in my cart so I can be sure of my order
| Acceptance Criteria:
| Given I am logged in I can click on the "Cart" button to display all the items added to my cart |

| Title: Remove single item | Priority: | Estimate: |
| ------------------------- | --------- | --------- |

| User Story:
| As a user, I want to remove a single item from my cart so I don't have to cancel my entire order and redo it |
| Acceptance Criteria:
| Given I am logged in and on the "Cart" screen I can click the "x" button next to an item to remove it from my order |

| Title: Reorder | Priority: | Estimate: |
| -------------- | --------- | --------- |

| User Story:
| As a user, I want to reorder items I've ordered previously so I can quickly order my favourites |
| Acceptance Criteria:
| Given I am logged in on the "Order history" screen I can click the "reorder" button on any previous order to add all the items from that order to my cart |

| Title: Total Price | Priority: | Estimate: |
| ------------------ | --------- | --------- |

| User Story:
| As a user, I want to the total amount I would be paying so I can decide if I want to order |
| Acceptance Criteria:
| Given I am logged in I can click on the "Cart" button to see a full list of my items and their individual and total price |

## How-To

### Basic User

- A user can register using either their email address and password, Facebook or Google
- Once registered a user can login using their email address and password, Facebook or Google
- After logging in a user can add menu items to their cart by clicking on the "Add to cart" button
- A user can then view all the items in their cart as well as the total amount owed in their Cart page
- An order can be placed by clicking the "place order" button
- An order can be cancelled by clicking on "clear cart"
- A user can also view previous orders by selecting Order History on the navbar
- A user can logout using the logout button on the navbar

### Admin user

- Is created on the system and new users can register as admin users.
- Admin user can delete existing menu items from the dashboard
- Admin user can create new menu items by clicking the add button and filling in the appropriate details in the modal form.

## Installation

Install fandos with npm

```bash
  cd project folder
  npm install
```

```bash
cd fandos
npm install
```

## Starting App

To run this project

```bash
 cd project folder
 npm  start
```

```bash
cd fandos
npm start
```

## Running Tests

To run tests, run the following command

### Server si

```bash
  npm run test
```

## Deployment

This app has been deployed on heroku. With both the frontend and backend deployed together.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

### Server side

`URI` - connection for mongoDB

`SECRET` - use own "string"

`GOOGLE_CLIENT_ID` - Use own client GOOGLE_CLIENT_ID

### Client side

`REACT_APP_GOOGLE_CLIENT_ID` - Add own google client ID

`REACT_APP_FACEBOOK_CLIENT_ID` - Add own facebook client ID

## Security

App uses helmet and contains so third party API calls

## Demo

https://fandos.herokuapp.com/
