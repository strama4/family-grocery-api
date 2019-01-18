const server = require('../../bin/www');
const request = require('request');
const base = 'http://localhost:5000/users';

const sequelize = require('../../db/models/index').sequelize;
const List = require('../../db/models').List;
const User = require('../../db/models').User;
const Collaborator = require('../../db/models').Collaborator;

describe('Routes : Users', () => {
    beforeEach(done => {
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

    describe('POST /users/register', () => {
        it('should register a valid user in', (done) => {
            const options = {
                url: `${base}/register`,
                form: {
                    email: 'johnnysfriend@gmail.com',
                    password: '123456789',
                    confirmPassword: '123456789'
                }
            }
            request.post(options, (err, res, body) => {
                expect(res.statusCode).not.toBeNull();
                User.findOne({ 
                    where: { email: 'johnnysfriend@gmail.com'}
                })
                .then(user => {
                    expect(user).not.toBeNull();
                    expect(user.email).toBe('johnnysfriend@gmail.com');
                    done();
                })
            })
        })
    })
});
