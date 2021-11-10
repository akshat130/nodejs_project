$(document).ready(function()
    {
        
        /* $('#form').ajaxForm(function() { 
            alert("Thank you for your comment!"); 
        });  */
       $("#form").on("submit",function(event){
           event.preventDefault();
           alert('this is the form submit function'+$('#form').attr('action'));
           $.ajax({
            
            // url: '/submit-student-data',
            url: $('#form').attr('action'),
            method: 'Post',
            data: $('#form').serialize(),
            success: (res) => {
                console.log(res);
                $('#resdata').html(res);
                alert('yor form submited successfully');
                jsondata();
            },
            error: (err)=>{
                alert('there is error');
            }
            /* data: {
                email:$('#email').val(),
                mobile: '123123123123'
            } */

            
        })
       })
       
       function jsondata(){
        $.ajax({
            
            // url: '/submit-student-data',
            url: "/submit-student-json",
            method: 'Post',
            data: $('#form').serialize(),
            success: async (res) => {
                    const data = await res
                    console.log('data',data.obj.firstName)
                // console.log('res '+res);
                // //var data = JSON.parse(res);
                // var strdata = JSON.stringify(res.firstName);
                //console.log('New'+strdata.firstName);
                $('#resdata1').html("<table border='1'><tr><th>First Name :</th><td>"+data.obj.firstName + "</td></tr><tr><th>Last Name</th><td>" +data.obj.lastName +
    "</td></tr><tr><th>First Mobile :</th><td>"+ data.obj.mobilE + "</td></tr><tr><th>Email :</th><td>"+ data.obj.emaiL+"</td></tr></table>");
                // alert('yor form submited successfully');
            },
            error: (err)=>{
                alert('there is error');
            }
            /* data: {
                email:$('#email').val(),
                mobile: '123123123123'
            } */

        })
       }
    });