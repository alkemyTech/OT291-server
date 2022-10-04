class HTML {
  static generateHtmlTable(model, attributes) {
    let htmlTable = `
      <table>
      <tr>`;

    attributes.forEach((column) => {
      htmlTable += `<th> ${column} </th>`;
    });
    htmlTable += `<tr>`;

    model.forEach((element) => {
      htmlTable += `<tr>`;

      attributes.forEach((column) => {
        htmlTable += `<td>` + element[column] + `</td>`;
      });

      htmlTable += `</tr>`;
    });
    htmlTable += `</table>`;

    return htmlTable;
  }
}

module.exports = HTML;
