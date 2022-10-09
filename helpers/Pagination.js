class Pagination {
  constructor(page, limit, section) {
    this.offset;
    this.section = section;
    this.limit = limit;
    this.pageInt = parseInt(page);
    this.aux = this.pageInt * this.limit;
    this.finalOffset = this.aux + this.limit;
    this.next = 1;
    this.previous = -1;
    this.nextPage = this.pageInt + this.next;
    this.previousPage = this.pageInt + this.previous;
    this.nextUrl = `${process.env.ONGURL || 'http://localhost:3000/'}${
      this.section
    }?page=${this.nextPage}`;
    this.previoustUrl = `${process.env.ONGURL || 'http://localhost:3000/'}${
      this.section
    }?page=${this.previousPage}}`;
  }

  async pages(req, res, dao) {
    if (this.pageInt === 1) {
      this.offset = 0;

      let searchInDb;

      try {
        searchInDb = await dao(this.offset, this.limit);
      } catch (error) {
        return res.status(400).json(error);
      }

      searchInDb.length > 0
        ? res.send({
            searchInDb,
            next: this.nextUrl,
          })
        : res.status(404).json({ msg: `Could not find ${this.section}` });
    }

    if (this.pageInt > 1) {
      this.offset = this.aux - this.limit;
      let searchInDb;
      let finalpage;

      try {
        searchInDb = await dao(this.offset, this.limit);
      } catch (error) {
        return res.status(400).json(error);
      }

      try {
        finalpage = await dao(this.finalOffset, this.limit);
      } catch (error) {
        return res.status(400).json(error);
      }

      if (searchInDb.length === 0) {
        res.status(404).json({ msg: 'Could not find results' });
      }

      if (searchInDb.length > 0 && finalpage.length !== 0) {
        res.send({
          searchInDb,
          previous: this.previoustUrl,
          next: this.nextUrl,
        });
      }

      if (searchInDb.length > 0 && finalpage.length === 0) {
        res.send({
          searchInDb,
          previous: this.previoustUrl,
        });
      }
    }
  }
}

module.exports = Pagination;
