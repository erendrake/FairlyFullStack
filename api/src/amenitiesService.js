const db = require('./database');

async function processAmenities(amenities, standId) {
  // Start transaction
  await db.beginTransaction();

  try {
    // Retrieve all current amenities for the stand
    const currentAmenities = await db.query('SELECT id FROM standAmenities WHERE standId = ?', [standId]);

    // Determine which amenities to delete
    const currentIds = currentAmenities.map((a) => a.id);
    const newIds = amenities.filter((a) => a.id).map((a) => a.id);
    const toDelete = currentIds.filter((id) => !newIds.includes(id));

    // Delete amenities not present in the new list
    if (toDelete.length > 0) {
      await db.run(`DELETE FROM standAmenities WHERE standId = ? AND id IN (${toDelete.join(',')})`, [standId]);
    }

    // Update existing amenities and prepare insert for new ones
    for (const amenity of amenities) {
      if (amenity.id) {
        // Update existing amenity
        console.log(`updating amenity: ${amenity.description}`);
        // eslint-disable-next-line no-await-in-loop
        await db.run('UPDATE standAmenities SET description = ? WHERE id = ? AND standId = ?', [amenity.description, amenity.id, standId]);
      } else {
        // Insert new amenity
        console.log(`inserting new amenity: ${amenity.description}`);
        // eslint-disable-next-line no-await-in-loop
        await db.run('INSERT INTO standAmenities (description, standId) VALUES (?, ?)', [amenity.description, standId]);
      }
    }

    // Commit transaction
    await db.commit();
  } catch (error) {
    // If any error occurs, rollback the transaction
    await db.rollback();
    throw error; // Rethrow the error after rolling back
  }
}

module.exports = { processAmenities };
