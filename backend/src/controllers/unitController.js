const StorageUnit = require('../models/StorageUnit');
const { logger } = require('../middleware/logger');
const AppError = require('../utils/AppError');

class UnitController {
  async getAvailableUnits(req, res, next) {
    try {
      const { location, size } = req.query;
      logger.info('Getting available units', { filters: { location, size } });
      
      // Log the request details
      logger.info('Request details:', {
        path: req.path,
        method: req.method,
        query: req.query,
        headers: req.headers
      });
      
      const units = await StorageUnit.findAll({ location, size });
      logger.info('Found units:', { count: units.length });
      
      res.json({
        status: 'success',
        data: units.map(unit => unit.toJSON())
      });
    } catch (error) {
      logger.error('Error getting available units', {
        error: error.message,
        stack: error.stack,
        query: req.query,
        path: req.path,
        method: req.method
      });
      next(error);
    }
  }
}

module.exports = new UnitController(); 