function checkText(){
    const textBox1 = document.getElementsByName('fname')[0].value.trim();
    const textBox2 = document.getElementsByName('lname')[0].value.trim();
    const textBox3 = document.getElementsByName('email')[0].value.trim();
    const textBox4 = document.getElementsByName('password')[0].value.trim();
    const textBox5 = document.getElementsByName('cpassword')[0].value.trim();
    const terms = document.getElementsByName('term')[0];

    let message = [];


    let atPosition = textBox3.indexOf('@');
    let dotPosition = textBox3.lastIndexOf('.');

    if (atPosition < 1 || dotPosition < atPosition + 2 || dotPosition + 2 >= textBox3.length) {
        message.push("Invalid email format.");
    }

    if(textBox1 === '')
    {
        message.push("First name have to be fill");
    }
    if(textBox2 === '')
    {
        message.push("Last name have to be fill");
    }
    if(textBox3 === '')
    {
        message.push("Password have to be fill");
    }
    if(textBox4 === '')
    {
        message.push("Password have to be fill");
    }
    if(textBox5 !== textBox4)
    {
        message.push("Confirm password not match");
    }

    if(message.length > 0)
        {
            alert(message.join('\n'));
        }else if(!terms.checked){
            alert("Term and service must be agreed")
        }else{
            window.location.href = "/views/home_page.html"
        }
    
}

