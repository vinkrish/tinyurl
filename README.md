# URL Shortener

URL Shortener is an application which will convert long URL's to short URL's

## Steps to use the app

The application is deployed at Amazon EC2 instance having public DNS: [ec2-54-197-199-83.compute-1.amazonaws.com](ec2-54-197-199-83.compute-1.amazonaws.com)

As User:

- No login in required for user to acces URL shortener service, hence accessing [ec2-54-197-199-83.compute-1.amazonaws.com](ec2-54-197-199-83.compute-1.amazonaws.com) will be suffice.
- User must enter lenghty URL they want to convert.
- Optional custom name can be provided to use in shortened URL, if the respective name is available user will get confirmation with shortened URL having custom name else unique alphanumeric URL shortener will be created.
- User can now enter returned shortened URL in browser and our application will redirect it to respective original URL.

Original URL:

[http://www.amazon.com/Kindle-Wireless-Reading-Display-Globally/dp/B003FSUDM4/ref=amb_link_353259562_2?pf_rd_m=ATVPDKIKX0DER&pf_rd_s=center-10&pf_rd_r=11EYKTN682A79T370AM3&pf_rd_t=201&pf_rd_p=1270985982&pf_rd_i=B002Y27P3M](http://www.amazon.com/Kindle-Wireless-Reading-Display-Globally/dp/B003FSUDM4/ref=amb_link_353259562_2?pf_rd_m=ATVPDKIKX0DER&pf_rd_s=center-10&pf_rd_r=11EYKTN682A79T370AM3&pf_rd_t=201&pf_rd_p=1270985982&pf_rd_i=B002Y27P3M)

Shortened URL:

[ec2-54-197-199-83.compute-1.amazonaws.com/emjc](ec2-54-197-199-83.compute-1.amazonaws.com/emjc)

As Admin:

- You need to login first before accessing your dashboard: [ec2-54-197-199-83.compute-1.amazonaws.com/login](ec2-54-197-199-83.compute-1.amazonaws.com/login)
- Admin will see time series plot of number of URL's shortened over time.

## Application Architecture

![Architecture](https://vinkrish-notes.s3-us-west-2.amazonaws.com/img/URL+Shortener+Architecture.png)

### Methodology

Following steps describes how the system is designed:

To get Shortened URL:

- Every new URL will be associated with Primary Key.
- 62 alphanumeric characters are used to encode and convert Primary Key into unique base62 characters.
- md5 hash of URL is also saved in system in order to reduce time required to search URL if already exist and thus avoiding shortened duplicate url's for same original URL.

To get Original URL:

- Extract base62 characters from shortened URL and use base62 decode function to find Primary Key used to encode.
- User Primary Key to get original URL from database.
- Above step is necessary in order to make our system faster, avoiding searching whole database.

### Sequence Diagram

![Sequence Digram](https://vinkrish-notes.s3-us-west-2.amazonaws.com/img/URL+Shortener+Sequence+Diagram.png)

## Developer Documentation

API's are documented using SWAGGER, and it can be access with below URL:

[ec2-54-197-199-83.compute-1.amazonaws.com/api-docs](ec2-54-197-199-83.compute-1.amazonaws.com/api-docs)

