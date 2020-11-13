using System.Collections.Generic;
using System.Threading.Tasks;

namespace PostDomain
{
    public interface IGenericRepository<T> where T : class
    {
      Task<ServiceResponse<List<T>>> GetAll();
      Task<ServiceResponse<T>> GetPostById(int id);
      Task AddPost(T data);
      Task UpdatePost( T model);
      Task Delete(int id);
    }
}
