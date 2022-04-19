module.exports = (sequelize, Sequelize) => {
    const Bite = sequelize.define("bites", {
        post: {
            type: Sequelize.STRING
        },
        createdAt: {
            type: Sequelize.DATE
        },
        userId: {
            type: Sequelize.INTEGER
        }
    });
    return Bite;
  };