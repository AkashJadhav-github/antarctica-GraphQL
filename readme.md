## PROJECT BRIEF

1) This is a try on project for below functionalities

    - Add a Organization
    - Add a User
    - Query a organization for the data
    - Query user for the data

2) Server running on 4000 port

3) This application runs on ONLY GraphQL endpoints


## Queries and Mutations available

Below are all queries and mutations available
These contains -  
Registering new user
Fetching all the data of user
Registerting new organization
Fetching all the organizations
Fetching all users and their relational nested organization data too
Fetching all organizations and their relational nested user data too

/*
ADD USER
mutation {
  addUser(first_name: "A", last_name: "J", password: "test123", email: "akash@gmail.com", employee_id: "1", organization_name: "ABC"){
    first_name,
    last_name,
    email,
    organization_name
  }
}

GET USER
{
  users {
    first_name
    last_name
    email
    employee_id
    organization_name
  }
}

GET USER WITH ORGANIZATION IN IT
{
  users {
    first_name
    organization {
      name
    }
  }
}



ADD ORGANIZATION
mutation {
  addOrganization(name: "ABC"){
    name
  }
}

GET ORGANIZATION
{
  organizations {
    name
  }
}

GET ORGANIZATION WITH USERS IN IT
{
  organizations {
    name
    users {
      first_name
    }
  }
}
*/

