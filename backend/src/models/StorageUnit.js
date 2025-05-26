const db = require('../../db');

class StorageUnit {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.size = data.size;
    this.location = data.location;
    this.pricePerDay = data.price_per_day;
    this.isAvailable = data.is_available;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;
  }

  static async findAll(filters = {}) {
    const { location, size } = filters;
    
    let query = db('storage_units')
      .select('*')
      .where('is_available', true);

    if (location) {
      query = query.whereRaw('LOWER(location) LIKE ?', [`%${location.toLowerCase()}%`]);
    }
    
    if (size) {
      query = query.whereRaw('LOWER(size) LIKE ?', [`%${size.toLowerCase()}%`]);
    }

    const units = await query;
    return units.map(unit => new StorageUnit(unit));
  }

  static async findById(id) {
    const unit = await db('storage_units')
      .where({ id })
      .first();
    
    return unit ? new StorageUnit(unit) : null;
  }

  static async create(data) {
    const [unit] = await db('storage_units')
      .insert({
        name: data.name,
        size: data.size,
        location: data.location,
        price_per_day: data.pricePerDay,
        is_available: data.isAvailable ?? true
      })
      .returning('*');

    return new StorageUnit(unit);
  }

  async update(data) {
    const [updated] = await db('storage_units')
      .where({ id: this.id })
      .update({
        name: data.name ?? this.name,
        size: data.size ?? this.size,
        location: data.location ?? this.location,
        price_per_day: data.pricePerDay ?? this.pricePerDay,
        is_available: data.isAvailable ?? this.isAvailable,
        updated_at: new Date()
      })
      .returning('*');

    return new StorageUnit(updated);
  }

  async delete() {
    await db('storage_units')
      .where({ id: this.id })
      .delete();
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      size: this.size,
      location: this.location,
      pricePerDay: this.pricePerDay,
      isAvailable: this.isAvailable,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = StorageUnit; 