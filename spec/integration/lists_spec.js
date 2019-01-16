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
            request.
            request.get(base, (err, res, body) => {
                expect(res.statusCode).toBe(200);
                expect(body).toContain('Grocery list');
                done();
            });
        });
    });

    describe('GET /lists/:id', () => {
        it('should render a list where user is owner of list', (done) => {
            request.get(`${base}/${this.list.id}`, (err, res, body) => {
                expect(body).toContain('Grocery list');
                done();
            });
        });
    });

    describe('POST /lists/:id/add', () => {

    })
});
