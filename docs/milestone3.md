### database tables design

### user
explain: store user token.

structure:

| Column | Data Type | Description |
| --- | --- | --- |
| id | interger | primary key |
| username | String | user's account |
| salt | String | salt |
| hash | String | user's hash |

### product
explain: store all second-hard products

structure:

| Column | Data Type | Description |
| --- | --- | --- | 
| id | Interger | primary key |
| img | String | the image of product |
| name | String | the name of product |
| detail | String | the detail of product |
| price | Double | the price of product |
| phone | String | owner's phone |
| status | String | the status of product |
| address | String | owner's address |
| user_id | Interger | owner's id |
| classification | String | product's classification |
| is_sold_out | Boolean | whether product was sold or not |

Breakdown of the division of labor:

Main Chenyu

Sign In Shiyan,Chenyu

Sign Up Chenyu

Details Shiyan

Post Shiyan

Update Shiyan

Server Chenyu


https://second-hand-product.herokuapp.com/
