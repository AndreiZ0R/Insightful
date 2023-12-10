namespace BookMySeatApi.Repositories.Interfaces;

public interface IGenericRepository<T> where T : class
{
    Task<T?> GetById(long id);
    Task<IEnumerable<T>> GetAll();
    Task<bool> Add(T entity);
    Task<bool> Update(T entity);
    Task<bool> Delete(T entity);
    Task<bool> SaveChanges();
}