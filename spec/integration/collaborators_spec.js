const server = require('../../bin/www');
const sequelize = require('../../db/models/index').sequelize;
const base = 'http://localhost:5000/lists';
const request = require('request');

const List = require('../../db/models').List;
const User = require('../../db/models').User;
const Collaborator = require('../../db/models').Collaborator;

describe('Routes : Collaborators', () => {
    beforeEach(done => {
        this.user;
        this.list;
        sequelize.sync({ force: true }).then(() => {
            User.create({
                email: 'johnnyboy@gmail.com',
                password: '123456789'
            })
            .then(user => {
                this.user = user;
                List.create({
                    title: 'Groceries',
                    items: [
                        {item: '2 Apples', completed: false},
                        {item: '3 stalks of celery', completed: false},
                    ],
                    userId: this.user.id
                })
                .then(list => {
                    this.list = list;
                    done();
                })
                .catch(err => {
                    console.log(err);
                    done();
                })
            })
            .catch(err => {
                console.log(err);
                done();
            });
        });
    });

    // describe('POST lists/:id/collaborators/create', () => {
    //     it('should add a collaborator to the associated list and user objects', (done) => {
            
    //         const options = {
    //             url: `${base}/${this.user.id}`
    //         }
    //     })
    // })
});