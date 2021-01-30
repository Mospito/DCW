const { log } = require('console');
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants');
var net = require('net');

var HOST = '127.0.0.1'; //Localhost String
var PORT = 6969;  //ระบุ portว่าเราเปิด portไหน

let count = 0;
let answer=Math.floor(Math.random() * 21);
let num = parseInt(answer);

//ดูคำสั่งใหญ่ๆทางซ้ายมือ ปล.ถ้าเขาจัดหน้ามาดี
net.createServer(function(sock) {   
    // เมื่อ Client เชื่อมต่อมา
    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
    console.log('Ans: ' + num);

    sock.on('data', function(data) {
    //ส่วนของการตอบกลับ  
    if(data.length == 10 )
        {
                count = 0;
                console.log('DATA ' + sock.remoteAddress + ': ' + data);
                //CheckFormat
                let FormatID = RegExp('[4-6][0-9]35512[0-9]{3}','g');
                let stdID = data;

                if(FormatID.test(stdID))
                {
                     sock.write('OK'); //ตอบกลับหา Client อีกครั้ง
                }
                else 
                {
                    sock.write('Wrong username!!');
                    sock.end();
                }                
        }
    else if(data.length != 10)
        {
            let tmp = parseInt(data.toString());
            count ++;
            console.log(count);
            
            if(count <= 3)
            {
                //CheckBINGO
                if(tmp === num)
                {   
                    console.log('Status: BINGO');
                    sock.write('BINGO');
                    console.log('DATA ' + sock.remoteAddress + ': ' + data);
            
                    let answer=Math.floor(Math.random() * 21);
                    let num = parseInt(answer);
                    sock.on('close', function(data){
                        console.log('CLOSED: BINGO');
                    });
                }
                else if(tmp > num || tmp < num)
                {   
                        sock.write('WRONG');
                }
            }
            else if(count == 4)
            {
                //CheckBINGO
                if(tmp === num)
                {   
                    console.log('Status: BINGO');
                    sock.write('BINGO');
                    console.log('DATA ' + sock.remoteAddress + ': ' + data);
            
                    let answer=Math.floor(Math.random() * 21);
                    let num = parseInt(answer);
                    sock.on('close', function(data){
                        console.log('CLOSED: BINGO');
                    });
                }
                else if(tmp > num || tmp < num)
                {   
                        sock.write('WRONG');
                        sock.on('close', function(data){
                            console.log('CLOSED: END');
                        });
                }
            }
            else
            {
                sock.end();
            }
        }
    else
        {
            sock.write('Wrong username!!');
            sock.end();
        }
    });
    

}).listen(PORT, HOST);//listen คือบอกว่า เปิด Sv ที่ Port ไหน

console.log('Server listening on ' + HOST +':'+ PORT);
