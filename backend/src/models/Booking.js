const db = require('../../db');
const AppError = require('../utils/AppError');

class Booking {
  constructor(data) {
    this.id = data.id;
    this.userName = data.user_name;
    this.unitId = data.unit_id;
    this.startDate = data.start_date;
    this.endDate = data.end_date;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;
  }

  static async findAll(userName) {
    const bookings = await db('bookings')
      .whereRaw('LOWER(TRIM(user_name)) = ?', [userName.trim().toLowerCase()])
      .join('storage_units', 'bookings.unit_id', 'storage_units.id')
      .select(
        'bookings.id',
        'bookings.user_name',
        'bookings.unit_id',
        'bookings.start_date',
        'bookings.end_date',
        'bookings.created_at',
        'bookings.updated_at',
        'storage_units.name as unit_name',
        'storage_units.location',
        'storage_units.size'
      );

    if (bookings.length === 0) {
      throw new AppError(`No bookings found for user ${userName}`, 404);
    }

    return bookings.map(booking => new Booking(booking));
  }

  static async create(data) {
    // Check for booking conflicts
    const conflict = await db('bookings')
      .where('unit_id', data.unitId)
      .andWhere((builder) => {
        builder
          .whereBetween('start_date', [data.startDate, data.endDate])
          .orWhereBetween('end_date', [data.startDate, data.endDate])
          .orWhere(function () {
            this.where('start_date', '<=', data.startDate)
              .andWhere('end_date', '>=', data.endDate);
          });
      })
      .first();

    if (conflict) {
      throw new AppError('Unit is already booked for this date range', 400);
    }

    // Check if unit exists and is available
    const unit = await db('storage_units')
      .where({ id: data.unitId })
      .first();

    if (!unit) {
      throw new AppError('Storage unit not found', 404);
    }

    if (!unit.is_available) {
      throw new AppError('Storage unit is not available', 400);
    }

    const [booking] = await db('bookings')
      .insert({
        user_name: data.userName,
        unit_id: data.unitId,
        start_date: data.startDate,
        end_date: data.endDate
      })
      .returning('*');

    return new Booking(booking);
  }

  async delete() {
    await db('bookings')
      .where({ id: this.id })
      .delete();
  }

  toJSON() {
    return {
      id: this.id,
      userName: this.userName,
      unitId: this.unitId,
      startDate: this.startDate,
      endDate: this.endDate,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = Booking; 