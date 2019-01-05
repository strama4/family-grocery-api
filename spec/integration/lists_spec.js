const server = require('../../bin/www');
const request = require('request');
const base = 'http://localhost:5000/lists';

const sequelize = require('../../db/models/index').sequelize;
const List = require('../../db/models').List;
const User = require('../../db/models').User;

describe('Routes : Lists', () => {
    beforeEach((done) => {
        this.user;
        sequelize.sync({ force: true }).then(() => {
            User.create({ 
                email: 'johnnyboy@gmail.com',
                password: '123456789'
            })
            .then(user => {
                this.user = user;
                
                List.create({ 
                    title: 'Grocery list',
                    items: [
                        {item: '2 Apples', completed: false},
                        {item: '3 stalks of celery', completed: false}
                    ],
                    userId: this.user.id
                })
                .then(list => done())
                .catch(err => {
                    console.log(err)
                    done();
                });
            });
        });
    });

    describe('GET /', () => {
        it('should render a list with all of the grocery lists', (done) => {
            request.get(base, (err, res, body) => {
                expect(res.statusCode).toBe(200);
                expect(body).toContain('Grocery list');
                done();
            });
        });
    });
});
