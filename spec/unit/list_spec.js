const sequelize = require('../../db/models/index').sequelize;

const List = require('../../db/models').List;

describe('List', () => {
    beforeEach((done) => {
        sequelize.sync({ force: true }).then(() => {
            done();
        })
    });

    describe('#create()', () => {
        it('should create a new list of items to purchase', (done) => {
            List.create({
                title: 'Groceries',
                items: [
                    {item: '2 Apples', completed: false},
                    {item: '3 stalks of celery', completed: false},
                ]
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
    });
});