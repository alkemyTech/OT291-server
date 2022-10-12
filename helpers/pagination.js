class Pagination {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }
  getPreviousPage(page, size) {
    let section = this.req.originalUrl.split('?')[0];
    let previousPage =
      this.req.protocol +
      '://' +
      this.req.get('host') +
      section +
      `?page=${page - 1}&size=${size}`;

    return previousPage;
  }

  getNextPage(page, size) {
    let section = this.req.originalUrl.split('?')[0];
    let nextPage =
      this.req.protocol +
      '://' +
      this.req.get('host') +
      section +
      `?page=${page + 1}&size=${size}`;
    return nextPage;
  }

  getPaginationParams() {
    const pageAsNumber = parseInt(this.req.query.page);
    const sizeAsNumber = parseInt(this.req.query.size);

    let page = 0;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
      page = pageAsNumber;
    }

    let size = 10;
    if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
      size = sizeAsNumber;
    }

    return { page, size };
  }

  getNumberOfTotalPages(numberOfElements, sizeOfPage) {
    return Math.ceil(numberOfElements / sizeOfPage);
  }

  getNextAndPreviousPage(page, size, totalPages) {
    let nextPage, previousPage;
    if (page > 0 && page < totalPages) {
      nextPage = this.getNextPage(page, size);
      previousPage = this.getPreviousPage(page, size);
    }
    if (page === totalPages - 1) {
      nextPage = 'There is no next page';
      previousPage = this.getPreviousPage(page, size);
    }
    if (page === 0) {
      previousPage = 'There is no previous page';
      nextPage = this.getNextPage(page, size);
    }
    if (totalPages === 1) {
      previousPage = 'There is no previous page';
      nextPage = 'There is no next page';
    }
    if (page >= totalPages) {
      nextPage = this.getNextPage(-1, 10);
      previousPage = this.getPreviousPage(1, 10);
    }

    return { nextPage, previousPage };
  }
}

module.exports = Pagination;
