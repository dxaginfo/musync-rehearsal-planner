const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Rehearsal = sequelize.define('Rehearsal', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    isRecurring: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    recurrencePattern: {
      type: DataTypes.JSON,
      allowNull: true,
      // This could contain:
      // - frequency: 'daily', 'weekly', 'monthly'
      // - interval: number (every X days/weeks/months)
      // - weekdays: array of days for weekly (0=Sunday, 6=Saturday)
      // - endDate: date when recurrence ends
      // - count: number of occurrences
    },
    cancelledDates: {
      type: DataTypes.JSON,
      allowNull: true,
      // Array of dates when recurring rehearsals are cancelled
    },
    bandId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'bands',
        key: 'id'
      }
    },
    createdById: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    reminderSent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    tableName: 'rehearsals',
    timestamps: true
  });

  // Instance methods
  Rehearsal.prototype.isInPast = function() {
    return new Date(this.endTime) < new Date();
  };

  Rehearsal.prototype.isInProgress = function() {
    const now = new Date();
    return new Date(this.startTime) <= now && new Date(this.endTime) >= now;
  };

  // Class methods
  Rehearsal.associate = (models) => {
    Rehearsal.belongsTo(models.Band, {
      foreignKey: 'bandId',
      as: 'band'
    });
    
    Rehearsal.belongsTo(models.User, {
      foreignKey: 'createdById',
      as: 'creator'
    });
    
    Rehearsal.hasMany(models.Attendance, {
      foreignKey: 'rehearsalId',
      as: 'attendances'
    });
    
    Rehearsal.belongsToMany(models.Song, {
      through: models.RehearsalSong,
      foreignKey: 'rehearsalId',
      as: 'songs'
    });
  };

  return Rehearsal;
};