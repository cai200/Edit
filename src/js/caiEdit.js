/*
* Author:蔡永生;
* createTime:2020-7-19;
* 说明:用于富文本的回退,恢复,插入图片等操作;
*
*
* */
(function (g,fn) {
  //module.exports =fn(g)
  fn(g)
})(window, function (window) {

     function Edit() {
       this.backItems=[];
       this.goItems=[];
     }
       var edit=new Edit();
  Edit.prototype.addbackitems=function (id) {
    var divDom=document.querySelector('#'+id+'');
    if (divDom.tagName==="DIV") {
      this.backItems.push(divDom.innerHTML);
    }else if (divDom.tagName==="TEXTAREA") {
      this.backItems.push((divDom.value));
    }else{
      throw Error("Only allow the DIV and TEXTAREA")
    }

     };
      //重置数据
  Edit.prototype.removeitems=function () {
    this.backItems=[];
    this.goItems=[];
  }
//回退
  Edit.prototype.backEdit=function (id) {

    if (id!==undefined) {
       var divDom=document.querySelector('#'+id+'');
      //pop 是将数组最后一个元素删除,同时返回原来的值给你,删除所有,数组变成undefined
       var  val=this.backItems.pop();
       if (this.backItems.length>=0&&val!==undefined) {
         this.goItems.push(val);
         //将回退的数据保存,作为前进恢复的数据.
         var  backvalue=this.backItems[this.backItems.length - 1];
        //回退数据删除完成后,数据变成undefined,所以将其值变为空,避免输出到富文本
         if (backvalue==undefined){
             backvalue="";
         }
         console.log(divDom.tagName)
         if (divDom.tagName==="DIV") {
           divDom.innerHTML = backvalue
         }else if (divDom.tagName==="TEXTAREA") {
           divDom.value = backvalue
         }else{
           throw Error("Only allow the DIV and TEXTAREA")
         }

       }
    }else{
      throw Error("There is no binding editor ID")
    }
     };
     //恢复
  Edit.prototype.goEdit=function(id){
    if (id!==undefined) {
    if (this.goItems.length!==0) {
//每次前进就将最后一个数据填进去
      var divDom=document.querySelector('#'+id+'');
      if (divDom.tagName==="DIV") {
        divDom.innerHTML = this.goItems[this.goItems.length - 1];
      }else if (divDom.tagName==="TEXTAREA") {
        divDom.value = this.goItems[this.goItems.length - 1];
      }else{
        throw Error("Only allow the DIV and TEXTAREA")
      }
      //同样,将前进的计入后退的统计中
      this.backItems.push(this.goItems[this.goItems.length - 1])
      //每次前进时就删除已经前进展示的数据,这样就保证每次前进都是最后那个的衔接数据
      this.goItems.splice(this.goItems.length - 1, 1)

    }
    }else{
      throw Error("There is no binding editor ID")
    }
  };
  /*
  插入图片
  json={"id":"","imgStream":e}

   */
  Edit.prototype.addImg=function (json) {
   // debugger;
    var divDOM = document.querySelector('#' + json.id + '');
    var divWidth = 300;
    var imgStream = json.imgStream;
    var  reader = new FileReader();
    reader.onload = function () {

      var  img = new Image();
      img.crossOrigin = "anonymous";
      img.src = reader.result;
      img.onload = function (e) {
      // debugger
        var suofang;
        var imgradio = Number(img.width / img.height);
        if (img.width > Number(divWidth)) {
          img.width =img.width / 6
         suofang = Number(img.width / 4);
        } else {
          img.width =img.width / 8
         suofang = Number(img.width / 2);
        }

        console.log(imgradio)
        var imghtml = document.createElement("img");
        imghtml.src = '' + img.src + '';
      //  imghtml.style.width='' + 50+ 'px';     imghtml.style.height='' + 50+ 'px';
       imghtml.className="imginser"
        imghtml.setAttribute("id","imgid")
        divDOM.appendChild(imghtml);
        var imgdom=document.querySelector("#imgid")
        imgdom.style.width = '' + suofang + 'px';
         imgdom.style.height = '' + suofang / imgradio + 'px';
        var allwidth = Number(divWidth);
        imgdom.style = {left: '' + (allwidth - suofang) / 2 + 'px', position: "relative"}
        // let imgwidth=Number(img.width/2);

        // console.log( reader.result);  //或者 e.target.result都是一样的，都是base64码
      }

    }
    reader.readAsDataURL(imgStream.target.files[0])
  }

     window.caiEdit=edit;
  return caiEdit;
})
