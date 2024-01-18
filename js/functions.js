function createRowTable(phone, num) {
  return `
          <tr>
              <td>${num}.</td>
              <td>${phone.name}</td>
              <td>${phone.price}</td>
              <td>${phone.description}</td>
              <td>${phone.category_id}</td>
              <td>${phone.status}</td>
              <td data-id = "${phone.id}" class ="d-flex gap-3">
                  <i role="button" class="bi bi-archive text-danger"></i>
                  <i role="button" class="bi bi-pen-fill text-success"></i>
              </td>
          </tr>
      `;
}
export { createRowTable };
