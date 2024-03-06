//This will fail because there's no real api to simulate user authentication
//The api end point here is not valid, it's just for demo purpose
describe('User Authentication', () => {
    it('Successful user login', () => {
            cy.request('POST', Cypress.env('API_URL') + '/posts', {
                username: Cypress.env('Username'),
                password: Cypress.env('Password')
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('username', 'Deepa');
                // Save user id for use in cart manipulation and order replacement
                Cypress.env('userId', response.body.id);
            });
    });
});

//Simulating creating users
describe('Create a user', () => {
    it('Creates a resource', () => {
        cy.fixture(`testData/createResource.json`).then((createResourceData) => {
            cy.request('POST', Cypress.env('API_Url') + 'posts', {
                createResourceData
            }).then((response) => {
                cy.log(response);
                expect(response.status).to.eq(201);
                Cypress.env('resourceId', response.body.id);
            });
        })
    })
})

describe('Product Retrieval and Details', () => {
    //Assuming this is a list of products
    it('Retrives the list of products', () => {
        cy.request('GET', Cypress.env('API_Url') + 'posts').then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.length.of.at.least(1);
        });
    });

    //Assuming this is the dtails of a specific product
    it('Retrieves details for a specific product', () => {
        cy.request('GET', Cypress.env('API_Url') + 'posts/3').then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.include.keys('userId', 'id', 'title', 'body');
        });
    });
});

//todos is used here
//Assuming it uses the user id retrived in User Authentication
//This will now use user id as null since there is no matching api to simulate user authentication
describe('Cart Manipulation', () => {
    it('Add an item to the cart', () => {
        cy.request('POST', 'https://jsonplaceholder.typicode.com/todos', {
            userId: Cypress.env('userId'),
            title: 'Added an item to cart',
            completed: false
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('title', 'Added an item to cart');
            Cypress.env('itemId', response.body.id);
        });
    });

    it('Remove an item from the cart', () => {
        console.log(`${Cypress.env('itemId')}`);
        cy.request('DELETE', `https://jsonplaceholder.typicode.com/todos/${Cypress.env('itemId')}`).then((response) => {
            expect(response.status).to.eq(200);
        });
    });
});


//Using updating posts here to simulate order replacement, using post id instead of order id
describe('Order Replacement', () => {
    it('Replace an order', () => {
        const postId = 2;
        cy.request('PUT', 'https://jsonplaceholder.typicode.com/posts/' + postId, {
            userId: Cypress.env('userId'),
            orderId: Cypress.env('orderId'),
            title: "Updated order"
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('title', 'Updated order');
        })
    });
});