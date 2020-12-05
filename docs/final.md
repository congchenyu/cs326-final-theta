# Theta

## Umass Second-Hand Trading Platform

## Fall 2020

### Project Idea
Our project idea is to create a second-hand trading platform on campus, where students can post the second-hand items they don’t use on the platform and buy what they need. 

We get inspiration from Mercari, this application is used for trading second-hand items. However, its trading scope covers the whole United States, which means if we want to sell or buy the item, you still need to pay for postage, because the item you want may come from another state. That will cost money and you need to wait for a long time. 

And as we can always hear our friends say that they want to sell their second-hand items, but can not find a place to trade. As far as I know, for my Chinese friends, they sell items using Wechat group chat.  And for my foreigner friends, they post items on Facebook. 

This is inconvenient because in each app the trading is only for a specific small group of people who speak the same language. We want to create A platform which everyone can trade on, not just people who speak the same language.

And for the trading scope we decided to just cover the Amherst area because that will make buyers and sellers more cost-effective(they do not need to pay postage and can get the items as fast as they want) and hope that will make students’ life become more convenient.


### Our Team Members

Chenyu Cong 
GitHub username：congchenyu 

Shiyan Yin 
GitHub username: shiy-cloud 

### User Interface

#### Main Page 
Main page displays all the products sold on this website, and indicates whether a product is reserved. A customer also can click on a product to see its details. The customer can search the keyword of a product he/she wants. A customer can also search products by types. A signed customer can sign in and sign out using the link here. A new customer can sign up using the link here.

#### Sign In Page
Sign In page allows a registered customer to sign in and enter the main page automatically. If a customer does not have an account, he/she can click the link to sign up.

#### Sign Up Page 
Sign Up page allows a new user to sign up their account. The email which have signed before can not be signed again. If a customer already has an account, he/she can click the link to sign in.

#### Details Page 
Detail page shows customers product details. If a customer wants to buy the product, he/she can click the reserve button to reserve it. If a product owner sold the product out, he/she can click the sold out button to delete the product. If the owner wants to update the information of a product, he/she can click the update button which allows them to do so.

#### Post Page 
Post page allows a signed user to post the product which they want to sell with information and pictures.

#### Update Page
Update page allows the product owner to update the product information.

### APIs

| --- | --- |

| /api/products | which gets a product classification |

| /api/products/search | which searches products by keyword|

| /api/product/:id | which gets a product id |

| /api/product/add | which adds a new product |

| /api/product/update | which lets a product owner to update a product |

| /api/product/buy | which allows a user to reserve(buy) a product |

| /api/product/delete | which allows a product owner to delete the product |

| /api/signup | which allows for a new user to sign up |

| /api/ signin | which allows a user to sign in |

| /api/signout | which allows a signed user to sign out |

| /api/user-info | which shows the user's email on the main page |

### Database Tables

#### User
Store user token.

Structure:

| Column | Data Type | Description |
| --- | --- | --- |
| id | Integer | primary key |
| username | String | user's account |
| password | String | user's password |
| token | String | user's token |

#### Product
Store all second-hard products

Structure:

| Column | Data Type | Description |
| --- | --- | --- | 
| id | Integer | primary key |
| img | String | the image of product |
| name | String | the name of product |
| detail | String | the detail of product |
| price | Double | the price of product |
| phone | String | owner's phone |
| status | String | the status of product |
| address | String | owner's address |
| user_id | Integer | owner's id |
| classification | String | product's classification |

### URL Routes/Mappings
| Sign In | switch to the sign in page | only the right password and email can be signed in |
| Do not have an account? Sign Up | switch to the sign up page |
| Sign Up | switch to the sign up page | The email which have signed before can not be signed again |
| Have an account? | switch to the sign in page |
| Sign Out | sign out an account |
| Home | switch to the main page |
| Post | switch to the post page | need to sign in first |
| Search | search products contain keyword |
| Books | search products with type book |
| Electronic Product | search products with type electronic product |
| Clothes | search products with type clothes |
| Furniture | search products with type furniture |
| Other | search products with type other |
| Reserve | reserve a product | need to sign in first |
| Update | update a product | only the product owner can do this |
| Sold Out | delete a product | only the product owner can do this |
| Product Details | show a product details |

### Authentication/Authorization
| Sign In | switch to the sign in page | only the right password and email can be signed in | If is not accessible : pop up alret |
| Sign Up | switch to the sign up page | The email which have signed before can not be signed again | If is not accessible : pop up alret |
| Reserve | reserve a product | need to sign in first | If is not accessible : pop up alret |
| Update | update a product | only the product owner can do this | If is not accessible : pop up alret |
| Sold Out | delete a product | only the product owner can do this | If is not accessible : pop up alret |

### Division Of Labor

Main Chenyu

Sign In Shiyan, Chenyu

Sign Up Chenyu

Details Shiyan

Post Shiyan

Update Shiyan

Server Chenyu, Shiyan

Video Shiyan, Chenyu
