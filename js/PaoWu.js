

//抛物线的面向对象：
//已知起点和终点，让某个物体做抛物线的运动

class PaoWu{
    constructor(boxDom,obj){
        this.boxDom = boxDom;
        let defaultObj = {
            goodsDom:null,//商品的dom对象
            goodImg:"img/6.jpg",//商品示意图
            startP:{
                left:0,
                top:0
            },
            endP:{
                left:500,
                top:300
            },
            timeSpace:1,
            goodscount:0,
            func:null
        }

        for(let key in defaultObj){
            this[key] = obj[key]==undefined?defaultObj[key]:obj[key];
        }
        this.p = this.getP();
        this.render();
        this.go();
    }

    render(){
        this.goodsDom = document.createElement("img");
        this.goodsDom.src = this.goodImg;
        this.goodsDom.style.cssText = `
            position: absolute;
            width:30px;
            height:30px;
            left:0px;
            top:0px;
            display: none;
        `;
        this.boxDom.appendChild( this.goodsDom);
    }

    //以右开口为示例：
    //1、计算p的值。（y^2 = 2px）
    getP(){
        //1、偏移到原点
        let newEndPoint =  {
            left:this.endP.left- this.startP.left,
            top:this.endP.top- this.startP.top
        }
        //2、计算（y^2 = 2px）
        return  newEndPoint.top*newEndPoint.top /(2*newEndPoint.left);
    }

    //抛物线的公式：
    //经过坐标原点的右开口的抛物线公式：y^2 = 2px; (p：是焦准距)
    go(){
        this.goodsDom.style.left = this.startP.left+"px";
        this.goodsDom.style.top = this.startP.top+"px";
        this.goodsDom.style.display = "block";
        
        let left1 = 0;
        let top1 = 0;
        
        let myTimer = setInterval(()=>{
            //一、数据处理
            //1、修改数据
            left1++;
            top1 =  Math.sqrt(2*this.p*left1); //y^2 = 2px;

            if(left1>=this.endP.left-this.startP.left){
                left1 = this.endP.left-this.startP.left;
                window.clearInterval(myTimer);
                this.goodsDom.style.display = "none";
                this.func&&this.func();//
            }
        
            //二、外观呈现
            this.goodsDom.style.left = `${left1+this.startP.left}px`;
            this.goodsDom.style.top = `${top1+this.startP.top}px`;

        },this.timeSpace);
    }

}
