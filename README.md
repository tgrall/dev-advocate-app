# Activity Management Application

This application is uses to capture Developer Advocate related activity.


### Prerequisites

* [Node.js][1] (v0.10.24 or newer)
* [MongoDB][2] (2.6.x or newer)

### Installation

Once you have clone the repository:

    cd dev-advocate-app

    npm install

The application uses several environment variables :

    export MONGO_URL=[mongodb connection string]
    export TW_CONS_KEY=[your consumer key]
    export TW_CONS_SECRET=[your consumer secret]
    export MODE=[production|dev]
    export OAUTH_REDIRECT=[home url of the appication]

Default values:

  * MONGODB_URL : mongodb://localhost:27017/dev-adv-activities
  * MODE=dev
  * OAUTH_REDIRECT=http://localhost:8080/
  

When mode is production, the security is enabled, this means you must log in to see data.

### Start

Simply execute the ./bin/server.sh script with node, npm or supervisor

    npm start


### Others

The application contains few tests (yes, only few of them... this is bad), run them using

    * npm test


Use Github issue management to log bug and enhancements requests.


[1]: http://www.nodejs.org
[2]: http://mongodb.org
