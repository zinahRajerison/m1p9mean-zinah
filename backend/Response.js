
class Response{
    constructor(status,message,data){
        this.status=status;
        this.message=message;
        this.data=data;
    }
    get getStatus(){
        return this.status;
    }
    get getMessage()
    {
        return this.message;
    }
    get getData()
    {
        return this.data;
    }
    set setStatus(status){
        this.status=status;
    }
    set setMessage(message)
    {
        this.message=message;
    }
    set setData(date)
    {
        this.data=data;
    }
}
module.exports=Response