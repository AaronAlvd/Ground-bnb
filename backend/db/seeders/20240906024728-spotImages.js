'use strict';

const { SpotImage } = require('../models');
const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');

const readImage = (filePath) => {
  return new Promise((resolve, reject) => {
      fs.readFile(filePath, (err, data) => {
          if (err) {
              reject(err);
          } else {
              resolve(data); // Return the binary data of the image
          }
      });
  });
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        file: await readImage(path.join(__dirname, '../../assets/homeImage01.jpeg')),
        preview: true,
      },
      {
        spotId: 2,
        file: await readImage(path.join(__dirname, '../../assets/homeImage02.jpeg')),
        preview: true,
      },
      {
        spotId: 3,
        file: await readImage(path.join(__dirname, '../../assets/homeImage03.webp')),
        preview: true,
      },
      {
        spotId: 4,
        file: await readImage(path.join(__dirname, '../../assets/homeImage04.jpeg')),
        preview: true,
      },
      {
        spotId: 5,
        file: await readImage(path.join(__dirname, '../../assets/homeImage05.jpeg')),
        preview: true,
      },
      {
        spotId: 6,
        file: await readImage(path.join(__dirname, '../../assets/homeImage06.jpeg')),
        preview: true,
      },
      {
        spotId: 7,
        file: await readImage(path.join(__dirname, '../../assets/homeImage07.webp')),
        preview: true
      },
      {
        spotId: 8,
        file: await readImage(path.join(__dirname, '../../assets/homeImage08.jpeg')),

        preview: true,
      },
      {
        spotId: 9,
        file: await readImage(path.join(__dirname, '../../assets/homeImage09.jpeg')),
        preview: true,
      },
      {
        spotId: 10,
        file: await readImage(path.join(__dirname, '../../assets/homeImage10.jpeg')),
        preview: true,
      },
      {
        spotId: 11,
        file: await readImage(path.join(__dirname, '../../assets/homeImage11.jpeg')),
        preview: true,
      },
      {
        spotId: 12,
        file: await readImage(path.join(__dirname, '../../assets/homeImage12.jpeg')),
        preview: true,
      },
      {
        spotId: 13,
        file: await readImage(path.join(__dirname, '../../assets/homeImage13.jpeg')),
        preview: true,
      },
      {
        spotId: 14,
        file: await readImage(path.join(__dirname, '../../assets/homeImage13.jpeg')),
        preview: true,
      },
      {
        spotId: 14,
        file: await readImage(path.join(__dirname, '../../assets/homeImage13.jpeg')),
        preview: false,
      },
      {
        spotId: 14,
        file: await readImage(path.join(__dirname, '../../assets/homeImage13.jpeg')),
        preview: false,
      },
      {
        spotId: 14,
        file: await readImage(path.join(__dirname, '../../assets/homeImage13.jpeg')),
        preview: false,
      },
  ]);
  },

  async down (queryInterface, Sequelize) {
    await SpotImage.destroy({
      where: {
        [Op.or]: [
          { spotId: 1},
          { spotId: 2},
          { spotId: 3},
          { spotId: 4},
          { spotId: 5},
          { spotId: 6},
          { spotId: 7},
          { spotId: 8},
          { spotId: 9},
          { spotId: 10},
          { spotId: 11},
          { spotId: 12},
          { spotId: 13},
          { spotId: 14},
        ]
      }
    });
  }
};
