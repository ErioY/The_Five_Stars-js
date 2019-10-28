
//滑入滑出（花多长时间，让某个元素出，某个元素进）
//参数:
// outDom：出去的dom
// inDom:进来的dom
// endLeft：终点
// timeLong:时长
//返回值：无

function slide(outDom,inDom,endLeft,timeLong){
    //计算时间 间隔 和 步长
    // 已知  总时长  总距离，
    //希望平滑一下，频率就高一些，时间间隔就短一些
    let timerSpace = 5;
    let step = outDom.offsetWidth/(timeLong/timerSpace);  // 400/步数

    let currLeft = 0;
    let myTimer = setInterval(()=>{
        //一、处理数据
        //1、计算
        currLeft = currLeft-step;
        //2、边界处理
        if(currLeft<endLeft){
            currLeft = endLeft;
            clearInterval(myTimer);
        }
        //二、改变外观
        outDom.style.left = currLeft+"px";
        inDom.style.left = currLeft+outDom.offsetWidth +"px";
    },timerSpace);

}

//淡入淡出（花多长时间，让某个元素出，某个元素进）
//参数:
// outDom：出去的dom
// inDom:进来的dom
// timeLong:时长
//返回值：无

function fadeInOut(outDom,inDom,timeLong){
    //计算时间 间隔 和 步长
    // 已知  总时长  总距离，
    //希望平滑一下，频率就高一些，时间间隔就短一些
    let timerSpace = 5;
    let step = 1/(timeLong/timerSpace); 

    let currOpacity = 0;
    let myTimer = setInterval(()=>{
        //一、处理数据
        //1、计算
        currOpacity = currOpacity+step;
        //2、边界处理
        if(currOpacity>1){
            currOpacity = 1;
            clearInterval(myTimer);
        }
        //二、改变外观
        outDom.style.opacity = 1-currOpacity;
        inDom.style.opacity = currOpacity;
    },timerSpace);

}