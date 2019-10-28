
//1）、先看项目中有哪些类（属性和方法）
class Banner{
    //构造函数
    constructor(obj){
        //默认值
        let defaultObj = {
            //轮播图的容器
            boxDom :null,
            //图片的容器
            imgBox :null,
            //豆豆的容器
            douBox :null,
            "type":"fade",//淡入淡出(fade)，滑入滑出(slide)；
            "width":400,
            "height":300,
            "imgs":["img/1.jpg","img/2.jpg","img/3.jpg"],
            //豆豆的大小
            "douSize" :15,
            //豆豆的颜色:
            "douColor":"pink",
            //豆豆的高亮颜色
            "douHighColor":"red",
            //豆豆是不是圆的
            "iscircle":true,
            "timeSpace":2000,
            "currIndex":0,//当前显示的图片的下标。
            "myTimer" :null
        }
        for(let key in defaultObj){
            this[key] = (obj[key]==undefined?defaultObj[key]:obj[key]);
        } 
         //1、自动播放
 
        this.render();//动态创建dom
        this.addEvent();//增加事件
        this.autoPlay();
    }

    //创建UI
    render(){
        this.boxDom.style.position = "relative";
        this.boxDom.style.overflow ="hidden";
        //1、创建图片
        //  1)、创建图片容器
        this.imgBox = document.createElement("div");
        this.imgBox.style.cssText = `
            position: absolute;
            width: 100%;
            height: 100%;`;
        this.boxDom.appendChild(this.imgBox);
        //  2)、创建图片
        for(let i in this.imgs){
            let imgDom = document.createElement("img");
            imgDom.src = this.imgs[i];
            imgDom.style.cssText = `
                position: absolute;
                width: 100%;
                height: 100%;
            `;
            //针对不同类型的轮播效果，设置不同的初始样式
            switch(this.type){
                case "fade":{
                    imgDom.style.opacity = 0;
                    if(i==0){
                        imgDom.style.opacity = 1;
                    }
                }break;
                case "slide":{
                    imgDom.style.left =`${this.width}px`;
                    if(i==0){
                        imgDom.style.left = "0px";
                    }
                }break;
            }
            this.imgBox.appendChild(imgDom);
        }
        //2、豆豆
        //   1)、创建豆豆容器
        this.douBox = document.createElement("ul");
        this.douBox.style.cssText = `
            position: absolute;            
            list-style: none;
            right: 50px;
            bottom:15px;
            z-index: 2;
            `;
        this.boxDom.appendChild(this.douBox);
        //   2)、创建豆豆
        for(let i in this.imgs){
           let liDom = document.createElement("li");
           liDom.style.cssText = `
            float: left;
            width: ${this.douSize}px;
            height: ${this.douSize}px;
            background-color: ${this.douColor};
            margin-left: ${this.douSize}px;
           `;
           if(this.iscircle==true){
               liDom.style.borderRadius = "50%";
           }
           if(i==0){
               liDom.style.backgroundColor=this.douHighColor;
           }
           this.douBox.appendChild(liDom);
        }
    }

    addEvent(){
        //2、鼠标放入停止
        this.boxDom.onmouseover = ()=>{
            this.stopPlay();
        }
        
        //3、鼠标离开继续播放
        this.boxDom.onmouseout = ()=>{
            this.autoPlay();
        }

        //4、点击按钮跳转到指定的图片
        let liDoms = this.douBox.children;
        for(let i=0;i<liDoms.length;i++){
            liDoms[i].onclick = ()=>{
                this.goImg(i);
            }
        }
    }
   
    autoPlay(){
        if(this.myTimer!=null){//已经启动过定时器
            return;
        }
        this.myTimer = setInterval(()=>{
            this.goImg(this.currIndex+1);
        },this.timeSpace);

    }

    //2、停止播放
    stopPlay(){
        window.clearInterval(this.myTimer);
        this.myTimer = null;
    }

    //4、跳转到指定的图片上
    goImg(ord){
    //一、数据处理
        //1、改变数据
        let outIndex = this.currIndex;
        this.currIndex = ord;
        //2、边界处理
        if(this.currIndex>this.imgs.length-1){
            this.currIndex=0;
        }
        //二、外观呈现
        this.showImg(outIndex,this.currIndex);
    }
    
    showImg(outIndex,currIndex){
        let imgDoms = this.imgBox.children;    
        console.log("出："+outIndex+",进："+currIndex);
    
        switch(this.type){
            case "fade": this.fadeInOut(imgDoms[outIndex],imgDoms[currIndex],this.timeSpace/3);break;
            case "slide": this.silderInOut(imgDoms[outIndex],imgDoms[currIndex],this.timeSpace/3);break;
        }
      
        let liDoms = this.douBox.children;
        liDoms[outIndex].style.backgroundColor= this.douColor;
        liDoms[currIndex].style.backgroundColor= this.douHighColor;
    }

    
    //两张图片的滑入滑出效果
    silderInOut(outImg,inImg,timeLong){
        //1、把将要进入的图片的位置放在盒子的右边
        inImg.style.left = this.width+"px";
        //2、右移
        let timeSpace = 10;
        let left = 0;
        var step = this.width/(timeLong/timeSpace);

        let myTimer = setInterval(()=>{
            left-=step;
            if(left<=-this.width){
                left = -this.width;
                window.clearInterval(myTimer);
            }
            outImg.style.left = left+"px";
            inImg.style.left = (left+this.width)+"px";
        },timeSpace);
    }
    //两张图片的淡入淡出效果
    fadeInOut(outImg,inImg,timeLong){
        var opacity1 = 0;
        var timeSpace = 10;
        var step = 1/(timeLong/timeSpace);
        var myTimer =  setInterval(function(){
            opacity1+=step;
            if(opacity1>=1){
                opacity1 = 1;
                window.clearInterval(myTimer);
            }
            inImg.style.opacity = opacity1;
            outImg.style.opacity = 1-opacity1;
        },timeSpace)
    }
   
}
