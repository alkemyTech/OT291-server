class Pagination {
  static getPreviousPage(req, res, page, size) {
    let section = req.originalUrl.split('?')[0];
    let previousPage =
      req.protocol +
      '://' +
      req.get('host') +
      section +
      `?page=${page - 1}&size=${size}`;

    return previousPage;
  }

  static getNextPage(req, res, page, size) {
    let section = req.originalUrl.split('?')[0];
    let nextPage =
      req.protocol +
      '://' +
      req.get('host') +
      section +
      `?page=${page + 1}&size=${size}`;
    return nextPage;
  }

  static getPaginationParams(req, res) {
    const pageAsNumber = parseInt(req.query.page);
    const sizeAsNumber = parseInt(req.query.size);

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

  static getNumberOfTotalPages(numberOfElements, sizeOfPage) {
    return Math.ceil(numberOfElements / sizeOfPage);
  }

  static getNextAndPreviousPage(req, res, page, size, totalPages) {
    let nextPage, previousPage;
    if (page > 0 && page < totalPages) {
      nextPage = this.getNextPage(req, res, page, size);
      previousPage = this.getPreviousPage(req, res, page, size);
    }
    if (page === totalPages - 1) {
      nextPage = 'There is no next page';
      previousPage = this.getPreviousPage(req, res, page, size);
    }
    if (page === 0) {
      previousPage = 'There is no previous page';
      nextPage = this.getNextPage(req, res, page, size);
    }
    if (totalPages === 1) {
      previousPage = 'There is no previous page';
      nextPage = 'There is no next page';
    }
    if (page >= totalPages) {
      nextPage = this.getNextPage(req, res, -1, 10);
      previousPage = this.getPreviousPage(req, res, 1, 10);
    }

    return { nextPage, previousPage };
  }
}

module.exports = Pagination;
