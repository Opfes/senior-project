module.exports = (sequelize, Sequelize) => {
    const Bite = sequelize.define("bites", {
        post: {
            type: Sequelize.STRING
        },
        updatedAt: {
            type: Sequelize.DATE
        },
        user_id: {
            type: Sequelize.INTEGER
        }
    });
    return Bite;
  };