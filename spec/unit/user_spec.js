const sequelize = require('../../db/models/index').sequelize;

const User = require('../../db/models').User;

describe('User', () => {
    beforeEach((done) => {
        sequelize.sync({ force: true }).then(() => {
            done();
        });
    });

    describe('#create()', () => {
        it('should create a new User object', (done) => {
            User.create({
                email: 'johnnyboy@gmail.com',
                password: '123456789'
            })
            .then(user => {
                expect(user).not.toBeNull();
                expect(user.email).toBe('johnnyboy@gmail.com');
                done();
            });
        });

        it('should not create a User object without a valid email', (done) => {
            User.create({
                email: 'email',
                password: '1234567890'
            })
            .then(user => {
                done();
            })
            .catch(err => {
                expect(err).not.toBeNull();
                done();
            });
        });
    });
});