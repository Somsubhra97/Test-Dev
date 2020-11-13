using System.Collections.Generic;
using PostDomain.PostsAggregate;
using System.Threading.Tasks;
using System;

namespace PostRepo
{
public class MockPost : IPostsRepository
    {
   
    private readonly PostStoreDbContext _context;
    public MockPost(PostStoreDbContext dbcontext)
    {  
         _context=dbcontext;

    }
 
    
    public async Task<ServiceResponse<List<Post>>> GetAll(){
        ServiceResponse<List<Post>> ob=new ServiceResponse<List<Post>>();
        List<Post> db=new List<Post>();
        db=await _context.Posts.ToListAsync();
        ob.Data=db;
        return ob;
    } 


    public async Task<ServiceResponse<Post>> GetPostById(int id){
        ServiceResponse<Post> ob=new ServiceResponse<Post>();        
        Post x=await _context.Posts.FirstOrDefaultAsync(i=>i.id==id);
        ob.Data= x;
        return ob;
    }



    public async Task AddPost(Post data){        
        await _context.Posts.AddAsync(cmd);      

    }


    
    public async Task<ServiceResponse<Post>> UpdatePost(Post data){
       _context.Posts.Update(data);
   }



    public async Task<ServiceResponse<List<Post>>> Delete(int id){
        ServiceResponse<Post> ob=new ServiceResponse<Post>();
        try{
            Command x=await _context.Commands.FirstAsync(i=>i.id==id);
            _context.Posts.Remove(x);

            ob.Data =await _context.Posts.ToListAsync();
        }
        catch(Exception e){
            ob.Message=e.Message;
            ob.Success=false;
        }
        return ob;
    }

   }
}
  
    