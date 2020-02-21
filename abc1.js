
const http = require('http');

const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'pmpmldb',
  password: '8551',
  port: 5432,
})

pool.connect()
query = "select r1.route_id, r1.stop_seq as R1Stop, r2.stop_seq as R2Stop from routes r1, routes r2 where r1.route_id=r2.route_id and r1.route_id in(select route_id from routes where r2.stop_id in(select key from stops where stop_name='Tech Mahindra')) and r1.stop_id in(select key from stops where stop_name='Ma Na Pa') and r1.stop_seq > r2.stop_seq;"

pool.query(query).then(res => {
path_info = []
	for(var i=0;i<res.rows.length;i++) {
		path_info=path_info .concat([{route_id:res.rows[i].route_id, r1stop:res.rows[i].r1stop, r2stop:res.rows[i].r2stop }])
	}

query = "select stop_id from routes where route_id=$1 and stop_seq between $2 and $3; ";
dbstr="{route_id: '"+path_info[0].route_id+"',\n"
pool.query(query, [path_info[0].route_id, path_info[0].r2stop, path_info[0].r1stop]).then(res => {
  path_info[0].path=[]
  
  dbstr+="path:[";
  elctr = 0;
	for(var i=0;i<res.rows.length;i++) {
		pool.query("select $2 as last, latitude, longitude, $3 as i from stops where key=$1;",[res.rows[i].stop_id,res.rows.length,i]).then(res =>{
      j=res.rows[0].i
      //while(path_info[0].path.length != j);

    //path_info[0].path = path_info[0].path .concat( [{lat:res.rows[0].latitude,long:res.rows[0].longitude}])
    
    path_info[0].path[j]=( {lat:res.rows[0].latitude,long:res.rows[0].longitude})
    elctr++;
    console.log(elctr)
      if(elctr == res.rows[0].last) {
        console.log("ello");
        for(var k=0;k<path_info[0].path.length;k++) {
          dbstr+="{lat:"+path_info[0].path[k].lat+',long:'+path_info[0].path[k].long+'},\n'
        }
        dbstr+="]}";
        pool.end()
      }
		}).catch(e=>console.log(e.stack))

	}
  
}).catch(e=>console.error(e.stack))
let app = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});

    res.end(dbstr);
});

app.listen(3000, '127.0.0.1');
console.log('Node server running on port 3000');


}).catch(e=>console.error(e.stack))