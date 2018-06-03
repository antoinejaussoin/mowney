module.exports = function (sequelize, DataTypes) {
  const Import = sequelize.define('Import', {
    date: DataTypes.DATE,
    fileName: DataTypes.STRING,
    isManual: DataTypes.BOOLEAN
  });

  Import.associate = function (models) {
    
  };

  return Import;
};
