using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

using PostDomain;
using PostDomain.PostsAggregate;

namespace PostAPI.Controllers
{

    [Route("api/posts")]
    [ApiController]
    public class PostsController : ControllerBase
    {
      
       private IUnitOfWork _unitOfWork;       
       public BooksController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]        
        public async Task<IActionResult> GetAll (){
           var ob=await _unitOfWork.Posts.GetAll();
                    
             return Ok(ob);
        } 
       
        
        // GET api/commands/{id}        
        [HttpGet("{id}", Name="GetPostById")]
        public async Task<IActionResult> GetPostById(int id){
             ServiceResponse<Post> x=await  _unitOfWork.Posts.GetPostByIdDB(id);
            if(x.Success)
              return Ok(x);  
            return NotFound();                
   
        }  
       
 
   
        [HttpPost]
        public async Task<IActionResult> Add(Post cmd){
          ServiceResponse<List<Post>> x=null;
          if (ModelState.IsValid){
            ServiceResponse<Post> x=await  _unitOfWork.Posts.GetPostByIdDB(id);
               try{
                   await _unitOfWork.Posts.AddPostDB(cmd); 
                    _unitOfWork.Complete();
                    x.Data=_unitOfWork.Posts.GetAll();
                    x.Success=true;
                    x.Message="Stored Successfully";                    
                    return Ok(x);  
               }
               catch(Exception e){
                _unitOfWork.Dispose();
               }
          
          }
          return BadRequest();
        }
            


        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Post cmd){ 
            ServiceResponse<List<Post>> x=null;  
                        
            await _unitOfWork.Posts.UpdatePost(cmd);        
            _unitOfWork.Complete(); 
            
            x.Data=_unitOfWork.Posts.GetAll();
            x.Success=true;
            x.Message="Updated Successfully";   
            return Ok(x);            
        } 

        [HttpDelete("{id}")]    
        public async Task<IActionResult> Delete(int id){
          ServiceResponse<List<Post>> x=null;   
          
           await _context.Posts.Delete(id);

            x.Data=_unitOfWork.Posts.GetAll();
            x.Success=true;
            x.Message="Deleted Successfully"; 

            return Ok(x);     
        }         
        
  }
}