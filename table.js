function getMaxLength(data, fieldName) {
  const allLengthsOfField = data.map(d => String(d[fieldName]).length);
  return Math.max(...allLengthsOfField);
}

function pad(value, maxlength) {
  if (value.length < maxlength) {
    return value + getChars(" ", maxlength - value.length);
  }
  return value;
}

function getChars(char, length) {
  var characters = "";
  for (var i = 0; i < length; i++) {
    characters += char;
  }
  return characters;
}

const delim = "\t\t";
const fieldNames = ["id", "product_name", "department_name", "price", "stock_quantity"];

function printTable(data, callback) {
  const lengths = fieldNames.map(fieldName => getMaxLength(data, fieldName));
  const headers = fieldNames.map((fieldName, index) => pad(fieldName, lengths[index])).join(delim);

  console.log(headers + "\n");

  for (var i = 0; i < data.length; i++) {
    console.log(
      fieldNames
      .map((fieldName, index) => {
        return pad(data[i][fieldName], lengths[index]);
      })
      .join(delim)
    );
  }

  callback();
}

module.exports = printTable;
