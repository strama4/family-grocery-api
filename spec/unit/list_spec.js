const sequelize = require('../../db/models/index').sequelize;

const List = require('../../db/models').List;
const User = require('../../db/models').User;

describe('List', () => {
    beforeEach((done) => {
        this.user;

        sequelize.sync({ force: true }).then(() => {
            User.create({
                email: 'johnnyboy@gmail.com',
                password: '12346789'
            })
            .then(user => {
                this.user = user;
                done();
            })
            .catch(err => {
                done();
            });
        });
    });

    describe('#create()', () => {
        it('should create a new list of items to purchase', (done) => {
            List.create({
                title: 'Groceries',
                items: [
                    {item: '2 Apples', completed: false},
                    {item: '3 stalks of celery', completed: false},
                ],
                userId: this.user.id
            })
            .then(list => {
                expect(list).not.toBeNull();
                expect(list.title).toBe('Groceries');
                expect(list.id).toBe(1);
                done();
            })
            .catch(err => {
                console.log(err);
                done();
            });
        });

        it('should not create a list without a title', (done) => {
            List.create({
                items: [
                    {item: '2 Apples', completed: false},
                    {item: '3 stalks of celery', completed: false},
                ]
            })
            .then(list => {
                done();
            })
            .catch(err => {
                expect(err).not.toBeNull();
                done();
            });
        });

        it('shouldn\'t create a List without a User', (done) => {
            List.create({
                title: 'Groceries',
                items: [
                    {item: '2 Apples', completed: false},
                    {item: '3 stalks of celery', completed: false},
                ]
            })
            .then(list => {
                done();
            })
            .catch(err => {
                expect(err).not.toBeNull();
                done();
            });
        });
    });
});