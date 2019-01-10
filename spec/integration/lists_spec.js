const server = require('../../bin/www');
const request = require('request');
const base = 'http://localhost:5000/lists';

const sequelize = require('../../db/models/index').sequelize;
const List = require('../../db/models').List;
const User = require('../../db/models').User;
const Collaborator = require('../../db/models').Collaborator;

describe('Routes : Lists', () => {
    beforeEach((done) => {
        this.user;
        this.list
        this.collab;
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
                .then(list => {
                    this.list = list;
                    done()
                })
                .catch(err => {
                    console.log(err)
                    done();
                });
            });
        });
    });

    describe('GET /lists', () => {
        it('should render a list with all of the grocery lists', (done) => {
            request.get(base, (err, res, body) => {
                expect(res.statusCode).toBe(200);
                expect(body).toContain('Grocery list');
                done();
            });
        });
    });

    describe('GET /lists/:userId', () => {
        it('should render a list where user is owner of list', (done) => {
            request.get(`${base}/${this.user.id}`, (err, res, body) => {
                expect(body).toContain('Grocery list');
                done();
            });
        });

        it('should render a list where user is collaborator of list', (done) => {
            User.create({
                email: 'johnnysfriend@gmail.com',
                password: 'johnnyismybestfriend'
            })
            .then(user => {
                this.collab = user;

                Collaborator.create({
                    userId: this.collab.id,
                    listId: this.list.id
                })
                .then(collab => {
                    request.get(`${base}/${this.collab.id}`, (err, res, body) => {
                        expect(body).toContain('Grocery list');
                        done();
                    });                    
                });
            });
        });
    });
});
