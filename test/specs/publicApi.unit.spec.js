
/*
   Tests that calling the public api gets through correctly to the writing
   correctly. streamingXhr is a stub so no actual calls are made. 
   
   Technically this tests some of instanceController.js as well as publicApi.js but the tests were
   written before the logic was split into two.
 */

describe("public api", function(){
   "use strict";

   describe("propagates through to wiring function", function(){
  
      beforeEach(function() {
         spyOn(window, 'wire');      
      });

      it('exports a usable function for GETs', function(){   
      
         oboe('http://example.com/oboez')
      
         expect(wire).toHaveBeenCalledLike(
             'GET',
             'http://example.com/oboez'
         )      
      })
         
      describe('get', function(){
         
         it('works via arguments', function(){   
         
            oboe('http://example.com/oboez')
         
            expect(wire).toHaveBeenCalledLike(
                'GET',
                'http://example.com/oboez'
            )      
               
         })
            
         it('works via options object', function(){   
              
            oboe({url: 'http://example.com/oboez'})
            
            expect(wire).toHaveBeenCalledLike(              
               'GET',
               'http://example.com/oboez'
            )   
         })
         
         it('propogates headers', function(){

            var headers = {'X-HEADER-1':'value1', 'X-HEADER-2':'value2'};
            
            oboe({url: 'http://example.com/oboez',
                  method:'GET', 
                  headers:headers})
            
            expect(wire).toHaveBeenCalledLike(              
               'GET',
               'http://example.com/oboez',
               undefined,
               headers
            )   
         })       
         
         describe('deprecated form', function(){
            it('can doGet with plain arguments', function(){   
            
               oboe.doGet('http://example.com/oboez')
            
               expect(wire).toHaveBeenCalledLike(
                   'GET',
                   'http://example.com/oboez'
               )
            })
            it('can doGet with an object argument', function(){   
               var headers = {'X-HEADER-1':'value1', 'X-HEADER-2':'value2'};            
            
               oboe.doGet({
                  url:'http://example.com/oboez',
                  headers:headers
               })
            
               expect(wire).toHaveBeenCalledLike(
                   'GET',
                   'http://example.com/oboez',
                   undefined,
                   headers
               )
            })             
         });          
      });
      
      describe('delete', function(){

         
         it('works via options object', function(){   
               
            oboe({url: 'http://example.com/oboez',
                  method: 'DELETE'})
            
            expect(wire).toHaveBeenCalledLike(
               'DELETE',
               'http://example.com/oboez'
            )   
         })   
         
         describe('deprecated form', function(){
         
            it('can doDelete with plain arguments', function(){
                 
               oboe.doDelete('http://example.com/oboez')
             
               expect(wire).toHaveBeenCalledLike(
                  'DELETE',
                  'http://example.com/oboez'
               )
            })
            
            it('can doDelete with object arguments', function(){   
                  
               oboe.doDelete({url: 'http://example.com/oboez'})
               
               expect(wire).toHaveBeenCalledLike(
                  'DELETE',
                  'http://example.com/oboez'
               )   
            })
         })         
      });
        
            
      describe('post', function(){
         
         it('can post an object', function(){
               
            oboe({   method:'POST',
                     url:'http://example.com/oboez',
                     body:[1,2,3,4,5]
            })
            
            expect(wire).toHaveBeenCalledLike(
               'POST',
               'http://example.com/oboez',
               [1,2,3,4,5]
            )   
         })   
         
         it('can post a string', function(){
                        
            oboe({   method:'POST',
                     url:'http://example.com/oboez',
                     body:'my_data'
            })
            
            expect(wire).toHaveBeenCalledLike(
               'POST',
               'http://example.com/oboez',
               'my_data'
            )   
         })   
         
         describe('deprecated form', function(){
            it('doPost with options object', function(){   
               var headers = {'X-HEADER-1':'value1', 'X-HEADER-2':'value2'};                 
                  
               oboe.doPost({
                  url: 'http://example.com/oboez', 
                  body:'my_data',
                  headers: headers
               })
               
               expect(wire).toHaveBeenCalledLike(              
                  'POST',
                  'http://example.com/oboez',
                  'my_data',
                   headers
               )   
            })
            it('doPost with plain arguments', function(){   
                                   
               oboe.doPost('http://example.com/oboez', 'my_data')
               
               expect(wire).toHaveBeenCalledLike(              
                  'POST',
                  'http://example.com/oboez',
                  'my_data'
               )   
            })            
         })                     
      });
      
      describe('put', function(){   
         it('can put a string', function(){
               
            oboe({   method:'PUT',
                     url:'http://example.com/oboez', 
                     'body':'my_data'})
            
            expect(wire).toHaveBeenCalledLike(
               'PUT',
               'http://example.com/oboez',
               'my_data'
            )   
         })
         
         describe('deprecated form', function(){
            it('can doPut with object', function(){
                  
               oboe.doPut({url:'http://example.com/oboez', body:'my_data'})
               
               expect(wire).toHaveBeenCalledLike(
                  'PUT',
                  'http://example.com/oboez',
                  'my_data'
               )   
            })         
         
            it('can doPut with plain arguments', function(){
                  
               oboe.doPut('http://example.com/oboez', 'my_data')
               
               expect(wire).toHaveBeenCalledLike(
                  'PUT',
                  'http://example.com/oboez',
                  'my_data'
               )   
            })            
         })
      });

      describe('patch', function(){
         it('can patch a string', function(){
            oboe({url:'http://example.com/oboez',
                  body:'my_data',
                  method:'PATCH'});

            expect(wire).toHaveBeenCalledLike(
               'PATCH',
               'http://example.com/oboez',
               'my_data'
            )
         })
         
         describe('deprecated form', function(){
            it('can doPatch with object', function(){
                  
               oboe.doPatch({url:'http://example.com/oboez', body:'my_data'})
               
               expect(wire).toHaveBeenCalledLike(
                  'PATCH',
                  'http://example.com/oboez',
                  'my_data'
               )   
            })         
         
            it('can doPatch with plain arguments', function(){
                  
               oboe.doPatch('http://example.com/oboez', 'my_data')
               
               expect(wire).toHaveBeenCalledLike(
                  'PATCH',
                  'http://example.com/oboez',
                  'my_data'
               )   
            })            
         })
      })
      
   });
   
   this.beforeEach(function(){
   
      this.addMatchers({
         /* Under Jasmine's toHaveBeenCalledLike, subject(foo, undefined)
            is considered different from subject(foo). This is slightly
            looser and considers those equal.  
          */
         toHaveBeenCalledLike:function(/*expectedArgs*/){
            var expectedArgs = Array.prototype.slice.apply(arguments);
            var actualCalls = this.actual.calls;
            
            var equals = this.env.equals_.bind(this.env);
            
            this.message = function() {
               var invertedMessage = "Expected spy " + this.actual.identity + " not to have been called like " + jasmine.pp(expectedArgs) + " but it was.";
               var positiveMessage = "";
               if (this.actual.callCount === 0) {
                  positiveMessage = "Expected spy " + this.actual.identity + " to have been called like " + jasmine.pp(expectedArgs) + " but it was never called.";
               } else {
                  positiveMessage = "Expected spy " + this.actual.identity + " to have been called like " + jasmine.pp(expectedArgs) + " but actual calls were " + jasmine.pp(this.actual.argsForCall).replace(/^\[ | \]$/g, '')
               }
               return [positiveMessage, invertedMessage];
            };            
                        
            return actualCalls.some(function( actualCall ){
            
               var actualArgs = actualCall.args;

               // check for one too many arguments given. But this is ok
               // if the extra arg is undefined.               
               if( actualArgs[expectedArgs.length] != undefined ) {

                  return false;
               }
               
               return expectedArgs.every(function( expectedArg, index ){
                  
                  return equals( actualArgs[index], expectedArg );                  
               });
            
            });
         }
      });
   })   
      
});



