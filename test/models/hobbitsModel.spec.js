const db = require('../../data/dbConfig');
const {
  insert,
  update,
  remove,
  getAll,
  findById,
} = require('../../api/models/hobbitsModel');

describe('hobbits model', () => {
  beforeEach(async () => {
    await db('hobbits').truncate();
  });

  it('has DB_ENV="testing"', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });

  describe('insert', () => {
    it('inserts the hobbit', async () => {
      await insert({ name: 'Matt' });
      await insert({ name: 'Jonathan' });
      const hobbits = await db('hobbits');
      expect(hobbits).toHaveLength(2);
    });

    it('inserts the provided hobbit', async () => {
      const hobbit = { name: 'Matt' };
      const insertedHobbit = await insert(hobbit);

      expect(insertedHobbit.name).toBe(hobbit.name);
    });

    describe('bulk insert', () => {
      it('returns an array with the same length as the inserted bulk', async () => {
        const hobbits = [{ name: 'Matt' }, { name: 'jonathan' }];
        const insertedHobbit = await insert(hobbits);

        expect(insertedHobbit.length).toBe(hobbits.length);
      });

      it('returns the inserted hobbits and their ids', async () => {
        const hobbits = [{ name: 'Matt' }, { name: 'Jonathan' }];
        const insertedHobbits = await insert(hobbits);
        expect(Object.keys(insertedHobbits[0]).sort()).toEqual(
          ['name', 'id'].sort()
        );
      });

      it('returns the inserted hobbits', async () => {
        const hobbits = [{ name: 'Matt' }, { name: 'Jonathan' }];
        hobbitNames = hobbits.map((hobbit) => hobbit.name);
        const insertedHobbitNames = (await insert(hobbits)).map(
          (hobbit) => hobbit.name
        );
        expect(Object.values(insertedHobbitNames).sort()).toEqual(
          hobbitNames.sort()
        );
      });
    });
  });

  describe('update', () => {
    it('removes the hobbit', async () => {
      const hobbit = { name: 'Matt' };
      const insertedHobbit = await insert(hobbit);
      await update(insertedHobbit.id, {
        name: 'John',
      });
      const updatedHobbit = await db('hobbits')
        .where({ id: insertedHobbit.id })
        .first();
      expect(updatedHobbit.name).toEqual('John');
    });
  });

  describe('remove', () => {
    it('removes the hobbit', async () => {
      const hobbit = { name: 'Matt' };
      const insertedHobbit = await insert(hobbit);

      await remove(insertedHobbit.id);
      const hobbits = await db('hobbits');
      expect(hobbits).toHaveLength(0);
    });
  });

  describe('getAll', () => {
    beforeEach(async () => {
      await db('hobbits').truncate();
    });
    it('returns all the hobbits', async () => {
      const hobbits = [{ name: 'Sansa' }, { name: 'John' }, { name: 'Arya' }];
      await insert(hobbits); // in knex, insert can also perform bulk insert
      const allHobbits = await getAll();
      expect(allHobbits).toHaveLength(3);
    });

    it('returns all the inserted hobbits', async () => {
      const hobbitNames = ['frodo', 'sam', 'ben'];
      const hobbits = hobbitNames.map((hobbitName) => ({
        name: hobbitName,
      }));
      await insert(hobbits); // in knex, insert can also perform bulk insert
      const namesOfInsertedHobbits = (await getAll()).map(
        (hobbit) => hobbit.name
      );
      expect(namesOfInsertedHobbits).toEqual(hobbitNames);
    });
  });

  describe('findById', () => {
    it('returns the hobbit that matches the provided id', async () => {
      const hobbits = [{ name: 'Sansa' }, { name: 'John' }, { name: 'Arya' }];
      await insert(hobbits);

      const sansa = await findById(1);
      expect(sansa).toEqual({ name: 'Sansa', id: 1 });
    });

    it('returns undefined no hobbit matches the provided id', async () => {
      const hobbits = [{ name: 'Sansa' }, { name: 'John' }, { name: 'Arya' }];
      await insert(hobbits);

      const sansa = await findById(100);
      expect(sansa).toEqual(undefined);
    });
  });
});
