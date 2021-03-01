# General insight:
  - The server manages multi-tenant users with multi-databases (with type mongodb).
  - At first, the database 'multi-tenant-app' contains the tenants that are allowed to access the system.
  - At second, the tenant manager module:
      - has a middleware responsible for handling each request based on its subdomain:
          For example:  customer1.foo.local => create database with the customer1's name and create a connection for it.
      - uses a Factory provider to inject dynamically the connections in the providers (with scope Request meaning for each request, a provider instance is created and then will be garbage-collected after the processing of the request).
      - has a decorator that will be used on the services that will consume the tenant information with a scope request as it depends also on the liftime of the request (For every request, the tenant will have only access to his database and a connection is created for that)
  - Finally, the tenant consumer module is created to use the multi-tenant handling with a controller and a service using the decorator from the manager module and having the suitable connection thanks to the tenant manager's factory provider.

# How to run the project?
  - npm install
  - npm run start
  - At this point, the database 'multi-tenant-app' is created (insert into it the data as mentioned in the requirements section)
  - After the previous step, we need to update the hosts file by adding the following URLs: 
    customer1.foo.local and customer2.foo.local. 
  - At this point, we can test our middleware by sending a get request to customer1.foo.local:3000 and customer2.foo.local:3000. At every request, a database and a connection with the tenant's name will be created (can be seen thanks to the console.logs())
  - Then, we can insert a tenant data into every database (as mentioned in the requirements)
  - Finally, we can test our consumer module (the suitable connection will be injected correctly based on the request subdomain) and the data will be read from each database (based also on the request subdomain) and can be seen thanks to the console.logs().
# Requirements: 
    - Database 'multi-tenant-app' needs to have some tenants data based on the tenant entity. For example, we can insert the following documents: {               
    "subDomain": "customer1",   
    "firstName": "Test1",
    "monthlyPayment": "3500",
    "email": "test1@test.com"
    } and {
    "subDomain": "customer2",   
    "firstName": "Test2",
    "monthlyPayment": "4500",
    "email": "test2@test.com"
    }
    - Database 'Test1' contains the corresponding tenant for our example:  
    {
    "subDomain": "customer1",   
    "firstName": "Test1",
    "monthlyPayment": "3500",
    "email": "test1@test.com"
    } 
    - Database 'Test2' contains the corresponding tenant for our example:  
    {
    "subDomain": "customer2",   
    "firstName": "Test2",
    "monthlyPayment": "4500",
    "email": "test2@test.com"
    }  


