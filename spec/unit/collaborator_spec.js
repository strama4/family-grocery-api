const sequelize = require('../../db/models/index').sequelize;

const List = require('../../db/models').List;
const User = require('../../db/models').User;
const Collaborator = require('../../db/models').Collaborator;

describe('Collaborator', () => {
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

    describe('#create', () => {
        it('should create a collaborator with the correct user and list IDs', (done) => {
            Collaborator.create({
                userId: this.user.id,
                listId: this.list.id
            })
            .then(collab => {
                expect(collab.userId).toBe(this.user.id);
                expect(collab.listId).toBe(this.list.id);
                done();
            })
            .catch(err => {
                console.log(err);
                done();
            });
        });
        
        it('should not create a collaborator without a user or list ID', (done) => {
            Collaborator.create({
                userId: this.user.id
            })
            .then(collab => {                
                done();
            })
            .catch(err => {
                expect(err.message).toContain('Collaborator.listId cannot be null');
                done();
            });
        });
    });
});