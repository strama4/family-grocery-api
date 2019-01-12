const sequelize = require('../../db/models/index').sequelize;

const List = require('../../db/models').List;
const User = require('../../db/models').User;
const Item = require('../../db/models').Item;

describe('Item', () => {
    beforeEach(done => {
        sequelize.sync({ force: true }).then(() => {
            this.user;
            this.list;

            User.create({
                email: 'johnnyboy@gmail.com',
                password: '12346789'
            })
            .then(user => {
                this.user = user;
                
                List.create({
                    title: 'Groceries',
                    userId: this.user.id
                })
                .then(list => {
                    this.list = list
                    done();
                })
                .catch(err => {
                    console.log(err);
                    done();
                });
            });
        })
        .catch(err => {
            console.log(err);
            done();
        });
    });

    describe('#create()', () => {
        it('should create a new Item object', (done) => {
            Item.create({
                description: '3 stalks of celery',
                complete: false,
                listId: this.list.id
            })
            .then(item => {
                expect(item).not.toBeNull();
                done();
            })
            .catch(err => {
                console.log(err);
                done();
            });
        });

        it('should not create a new Item object without a user', (done) => {
            Item.create({
                description: '2 apples',
                complete: false
            })
            .then(item => {
                done();
            })
            .catch(err => {
                expect(err.message).toContain('Item.listId cannot be null')
                done();
            })
        })
    });
});