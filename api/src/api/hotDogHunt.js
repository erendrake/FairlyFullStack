const express = require('express');
const sqlite3 = require('sqlite3');
const { processAmenities } = require('../amenitiesService');
const db = new sqlite3.Database('database.sqlite');

const router = express.Router();

async function getStandById(standId, res) {
  await db.get('SELECT id, name, address FROM stands where id = :id;', { ':id': standId }, async (err, row) => {
    if (!row) {
      res.status(404)
        .json({ 'message': 'not found' });
    } else {
      await db.all('SELECT id, description FROM standAmenities where standId = :id', { ':id': standId }, (err, amenitiesRows) => {
        row.amenities = amenitiesRows ?? [];
        res.json(row ?? {});
      });
    }
  });
}

router.get('/', async (req, res) => {
  await db.all('SELECT id, name, address FROM stands', (err, rows) => {
    rows = rows ?? []
    var response = {
      data : rows,
      count : rows.length
    }
    res.json(response)
  });
});


router.get('/:standId', async (req, res) => {
  let standId = req.params.standId;

  await getStandById(standId, res);
});

router.put('/:standId/amenities', async (req, res) => {
  let standId = req.params.standId;
  let body = req.body;
  console.log(`StandId: ${standId}`);
  console.log(`RequestBody: ${JSON.stringify(body.amenities)}`);
  await processAmenities(body.amenities, standId);

  await getStandById(standId, res)
});

module.exports = router;
