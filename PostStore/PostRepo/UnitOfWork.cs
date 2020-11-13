using System;
using PostDomain;
using PostDomain.BooksAggregate;

namespace PostRepo
{
    public class UnitOfWork :IUnitOfWork
    {
        private readonly PostStoreDbContext _context;
        public IPostsRepository Posts { get; }
       

        public UnitOfWork(PostStoreDbContext postStoreDbContext,
            IPostsRepository postsRepository)
        {
            this._context = postStoreDbContext;            
            this.Posts = postsRepository;            
        }
        public int Complete()
        {
            return _context.SaveChanges();
        }
        protected virtual void Dispose(bool disposing)
        {
            
                _context.Dispose();
        }
}
