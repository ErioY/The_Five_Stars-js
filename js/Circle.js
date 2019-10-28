
class Circle{
    constructor(boxDom,obj){
        this.boxDom = boxDom;
        let defaultObj = {
            centerDom:null,
            ballDom:null,
            centerPoint:{left:200,top:200},/*中心点*/
            r:100,
            timeSpace:20,
            ballR:10,
            degree:0, 
        }
        for(let key in defaultObj){
            this[key] = obj[key]==undefined?defaultObj[key]:obj[key];
        }
        this.baseLeft = this.centerPoint.left;
        this.baseTop = this.centerPoint.top-this.r;

        this.render();
    }
    render(){
        //0、设置容器的定位
        this.boxDom.style.position = "relative";
        //1、创建中心点
        this.centerDom = document.createElement("div");
        this.centerDom.style.cssText = `
            position: absolute;
            left:${this.centerPoint.left-5}px;
            top:${this.centerPoint.top-5}px;
            width: 10px;
            height: 10px;
            background-color: red;
            border-radius: 50%;
        `;
        this.boxDom.appendChild(this.centerDom);

        //2、转动的物体
        this.ballDom = document.createElement("div");
        this.ballDom.style.cssText = `
            position: absolute;
            left:${this.centerPoint.left-this.ballR}px; 
            top:${this.centerPoint.top-this.r-this.ballR}px;
            width: ${this.ballR*2}px;
            height: ${this.ballR*2}px;
            background-color:blue;
            border-radius: 50%;
        `;
        this.boxDom.appendChild(this.ballDom);
    }

    goCircle(){
        setInterval(()=>{
            //一、数据处理
            //1、修改数据
            this.degree++;
            this.degree = this.degree%360;
            let left1 = this.baseLeft+this.r*Math.sin( Math.PI/180*this.degree );
            let top1 = this.baseTop+this.r-this.r*Math.cos( Math.PI/180*this.degree );
    
            //二、外观呈现
            this.ballDom.style.left = (left1-this.ballR) +"px";
            this.ballDom.style.top = (top1-this.ballR)+"px";
        },this.timeSpace);
    }
}