var OrderModel = require('./ordermodel')
var SendMail = require('./sendmail')


exports.createOrder =  (data)=>{
    // console.log("data received from controller" , data)
    return new Promise((resolve,reject)=>{
    
    var validatedData = new OrderModel(data)
    validatedData.save().then((result)=>{
            resolve(result)
        }),(error)=>{
                reject({
                    errorMessage:"Internal Server Error"
                })
            }
        })
}

exports.displayall = ()=>{
    return new Promise((resolve,reject)=>{
        OrderModel.find({}, (err, items) => {
            if (err) {
                reject("Could not retrieve data!!")
            }
            else {
                // console.log(items)
                resolve(items)
                
            }
        });

        });
}

exports.sendMailservice =  (data)=>{
    // console.log("data received from controller" , data)
    return new Promise((resolve,reject)=>{
        SendMail.sendMail(JSON.parse(data.email)).then((result)=>{
            resolve(result)
        },(error)=>{
                reject({
                    errorMessage:"Internal Server Error",err:error
                })
            })
        })
}
