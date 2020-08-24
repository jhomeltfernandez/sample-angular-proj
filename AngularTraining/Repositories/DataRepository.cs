using AngularTraining.DataAccess;
using AngularTraining.Model.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularTraining.Repositories
{
    public class DataRepository<T> : IDataRepository<T> where T : BaseEntity
    {
        private readonly AppDbContext context;
        private DbSet<T> entities;

        public DataRepository(AppDbContext context)
        {
            this.context = context;
            entities = context.Set<T>();
        }

        public IEnumerable<T> GetAll()
        {
            return entities.AsEnumerable();
        }

        public T Find(int id) => entities.Find(id);

        public IEnumerable<T> Get(Func<T, bool> predicate)
        {
            return entities.Where(predicate).AsEnumerable();
        }

        public void Insert(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }
            entities.Add(entity);
            context.SaveChanges();
        }

        public void Update(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }
            context.SaveChanges();
        }

        public void Delete(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }
            entities.Remove(entity);
            context.SaveChanges();
        }


        #region Async

        public Task<List<T>> GetAllAsync()
        {
            return entities.ToListAsync();
        }

        public Task<List<T>> GetAsync(Func<T, bool> predicate)
        {
            return entities.Where(predicate).AsQueryable().ToListAsync();
        }

        public async Task InsertAsync(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }
            entities.Add(entity);
            await context.SaveChangesAsync();
        }

        public async Task UpdateAsync(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }
            await context.SaveChangesAsync();
        }

        public async Task DeleteAsync(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }
            entities.Remove(entity);
            await context.SaveChangesAsync();
        }

        public async Task<T> FindAsync(int id) 
        {
            return await entities.FindAsync(id);
        }
        #endregion
    }
}
