'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('Users', 'role', {
            type: Sequelize.ENUM('admin', 'employee'),
            allowNull: false,
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('Users', 'role', {
            type: Sequelize.STRING,
            allowNull: false,
        });
    },
};
