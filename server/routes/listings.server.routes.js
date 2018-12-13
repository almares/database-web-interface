/* Dependencies */
var listings = require('../controllers/listings.server.controller.js'),
    express = require('express'),
    router = express.Router();

router.route('/flowers')
  .get(listings.listFlowers)
  .post(listings.create)
  .put(listings.updateFlower);


router.route('/locations')
  .get(listings.listLocations)

router.route('/sightings')
  .post(listings.addSighting)

router.route('/flowers/:comname')
  .get(listings.read)
  .put(listings.update)
  .delete(listings.delete);

// Router params
router.param('comname', listings.setComName);

module.exports = router;
