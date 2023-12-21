# Graph Processing Service

Developed by Patrice Andala Opiyo - [GitHub](https://github.com/patriceandala)

## Overview

This Graph Processing Service is a Node.js server built using the Nest.js framework. It represents and processes
constant graph data, with each node representing a status (identified by a number), and each directed edge representing
a set of transition rules.

The transitions are defined as an array `[Action, Rule, Type]`, where:

- `Type` can be: 'S' (SINGLE) / 'B' (BULK)
- `Action` can be: 'S' (SEND) / 'R' (RETURN)
- `Rule` can be: 'A' (ADMIN) / 'P' (PARTNER) / 'U' (USER) / 'C' (COURIER)

## Features

1. **Next Status Query**: Given a transition, the service can determine the next status.
2. **Path Finding for Bulk Transitions**: Given a transition and a bulk of statuses, the service finds the correct path
   to the next status for the given transition.

## Setup and Installation

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository from GitHub:

````bash
git clone https://github.com/patriceandala/graph-processing-service.git
````

2. Navigate to the project directory:

````bash
cd graph-processing-service
````

3. Install the dependencies:

````bash
npm install
````

or

````bash
yarn install
````

### Running the Server

Run the server locally using the following command:

````bash
npm run start
````

or

````bash
yarn start
````

### Testing the Application

To run the unit tests for the service, use the command:

````bash
npm test
````

or

````bash
yarn test
````

## API Endpoints

### `GET /graph/next-status`

- Query Parameters:
    - `currentStatus`: Current status (number)
    - `transition`: Transition object (`{ action, rule, type }`)
- Returns the next status if a valid transition exists.

### `POST /graph/find-path`

- Request Body:
    - `statuses`: Array of current statuses (number[])
    - `transition`: Transition object (`{ action, rule, type }`)
- Returns an array representing the path of transitions.

## Design Description

The application is designed with modularity and scalability in mind, utilizing the robust features of Nest.js.
The `GraphService` is responsible for managing the graph data and processing the transitions. A `GraphController` is
used to handle HTTP requests and interact with the `GraphService`. Data transfer objects (DTOs) are used to enforce a
consistent structure for transitions.

## Contributions

Feel free to fork this project and contribute. For any changes or improvements, please open an issue first to discuss
what you would like to change.



## Contact

- Patrice Andala Opiyo - [GitHub](https://github.com/patriceandala)


