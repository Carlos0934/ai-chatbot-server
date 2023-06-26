using System.Linq.Expressions;
using ShoppingCartApi.Models;

using Microsoft.EntityFrameworkCore;

namespace ShoppingCartApi.Data;


public class EFCoreRepository<T> where T : Entity
{

    protected readonly DbSet<T> _dbSet;

    public EFCoreRepository(AppDbContext context)
    {
        _dbSet = context.Set<T>();
    }

    public async Task<T> Save(T entity)
    {
        if (entity.Id == 0 || entity.Id == null)
        {
            await _dbSet.AddAsync(entity);
        }
        else
        {

            _dbSet.Update(entity);
        }

        return entity;
    }



    public T Delete(T entity)
    {
        _dbSet.Remove(entity);

        return entity;
    }


    public async Task<T?> GetById(int id, params Expression<Func<T, object>>[]? include)
    {
        return await GetAll(include).FirstOrDefaultAsync(e => e.Id == id);
    }


    public IQueryable<T> GetAll(params Expression<Func<T, object>>[]? include)
    {
        IQueryable<T> query = _dbSet;

        if (include != null)
        {
            foreach (var item in include)
            {
                query = query.Include(item);
            }
        }

        return query;
    }

}