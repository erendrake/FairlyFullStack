const express = require('express');
const sqlite3 = require('sqlite3');
const { processAmenities } = require('../amenitiesService');

const db = new sqlite3.Database('database.sqlite');

const router = express.Router();

async function getStandById(standId, res) {
  await db.get('SELECT id, name, address FROM stands where id = :id;', { ':id': standId }, async (err, row) => {
    if (!row) {
      res.status(404).json({ message: 'not found' });
    } else {
      await db.all('SELECT id, description FROM standAmenities where standId = :id', { ':id': standId }, (innerErr, amenitiesRows) => {
        row.amenities = amenitiesRows == null ? [] : amenitiesRows;
        res.json(row);
      });
    }
  });
}

router.get('/', async (req, res) => {
  await db.all('SELECT id, name, address FROM stands', (err, rows) => {
    rows = rows == null ? [] : rows;
    const response = {
      data: rows,
      count: rows.length,
    };
    res.json(response);
  });
});

router.get('/:standId', async (req, res) => {
  const { standId } = req.params;
  await getStandById(standId, res);
});

router.put('/:standId/amenities', async (req, res) => {
  const { standId } = req.params;
  const { body } = req;
  console.log(`StandId: ${standId}`);
  console.log(`RequestBody: ${JSON.stringify(body.amenities)}`);
  await processAmenities(body.amenities, standId);

  await getStandById(standId, res);
});

module.exports = router;
