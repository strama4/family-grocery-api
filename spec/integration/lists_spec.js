const server = require('../../bin/www');
const request = require('request');
const base = 'http://localhost:5000/lists';

const sequelize = require('../../db/models/index').sequelize;
const List = require('../../db/models').List;
const User = require('../../db/models').User;
const Item = require('../../db/models').Item;
const Collaborator = require('../../db/models').Collaborator;
const hashpassword = require('../../auth/helpers').hashPassword;

describe('Routes : Lists', () => {
    beforeEach((done) => {
        this.user;
        this.list;
        this.userToken;
        sequelize.sync({ force: true }).then(() => {
            User.create({ 
                email: 'johnnyboy@gmail.com',
                password: hashpassword('123456789')
            })
            .then(user => {
                this.user = user;

                const options = {
                    url: 'http://localhost:5000/users/login',
                    form: {
                        email: 'johnnyboy@gmail.com',
                        password: '123456789'
                    }
                }
                request.post(options, (err, res, body) => {
                    const token = JSON.parse(body).token;
                    this.userToken = token;
                
                    List.create({ 
                        title: 'Grocery list',
                        userId: this.user.id
                    })
                    .then(list => {
                        this.list = list;

                        Item.create({
                            description: 'Apples',
                            complete: false,
                            listId: this.list.id
                        })
                        .then(item => {
                            done()
                        });
                    })
                    .catch(err => {
                        console.log(err)
                        done();
                    });
                });
            });
        });
    });

    describe('GET /lists', () => {
        it('should render all lists', (done) => {
            request.get(base, (err, res, body) => {
                expect(body).toContain('Grocery list');
                done();
            });
        });
    });

    describe('GET /lists/:id', () => {
        it('should render a list associated with that listId', (done) => {
            List.create({
                title: 'Other list',
                userId: this.user.id
            })
            .then(list => {
                Item.create({
                    description: 'Oranges',
                    complete: false,
                    listId: list.id
                })
                .then(item => {
                    request.get(`${base}/${this.list.id}`, (err, res, body) => {
                        expect(body).toContain('Grocery list');
                        expect(body).toContain('Apples');
                        expect(body).not.toContain('Oranges');
                        done();
                    });
                })
            })
        });
    });
});
