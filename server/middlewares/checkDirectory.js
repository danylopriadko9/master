const fs = require('fs');

const createDirectory = async (req, res, next) => {
  const { id, type } = req.params;
  // Создаем путь к папке
  const path = `static/${type}/${id}`;

  // Проверяем существование папки
  try {
    await fs.promises.access(path);
  } catch (err) {
    // Если папки не существует, создаем ее
    await fs.promises.mkdir(path);
  }
  next();
};

module.exports = createDirectory;
