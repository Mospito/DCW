
var net = require('net');
var HOST = '127.0.0.1';
var PORT = 6969;
let answer=Math.floor(Math.random() * 21);
let num = parseInt(answer);




var client = new net.Socket();
client.connect(PORT, HOST, function() {
    //เรียกใช้Fucntion ก็ต่อเมื่อ Client เชื่อมต่อกับ Server เรียบร้อยแล้ว  **NonBlocking I/O
   console.log('CONNECTED TO: ' + HOST + ':' + PORT);
   //เป็นการส่งข้อมูล
   client.write('6135512026');
});


client.on('data', function(data) {

   if(data.toString() === 'OK')
   {
      console.log('Server Send: OK');
      client.write(num.toString());
      console.log("Send: "+ num);
      num++;

   }
   else if(data.toString() === 'WRONG')
   {
      console.log('Server Send: WRONG');
      console.log("Send: "+ num);
      client.write(num.toString());
      num++;
   }
   else if(data.toString() === 'BINGO')
   {
      console.log('Server Send: BINGO');
      num--;
      console.log("Send: "+ num + " Is BINGO Yeahhhhhhhhhh!");
      client.destroy();
   }
   else
   {

      console.log('ERROR : ' + data);

   }

  
   //ตัดการเชื่อมต่อ
   // client.destroy();
});


// Add a 'close' event handler for the client socket
client.on('close', function() {
   console.log('Connection closed');
});



