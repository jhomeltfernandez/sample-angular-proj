using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AngularTraining.Repositories
{
    public interface IDataRepository<T> where T : class
    {
        void Delete(T entity);
        Task DeleteAsync(T entity);
        IEnumerable<T> Get(Func<T, bool> predicate);
        IEnumerable<T> GetAll();
        Task<List<T>> GetAllAsync();
        Task<List<T>> GetAsync(Func<T, bool> predicate);
        void Insert(T entity);
        Task InsertAsync(T entity);
        void Update(T entity);
        Task UpdateAsync(T entity);
        T Find(int id);
        Task<T> FindAsync(int id);
    }
}