class Utils {
  constructor(){
		this.baseUrl ='https://code.itndedu.com/pz'
	}
  // 获取用户信息
  getUserInfo() {
      uni.login({
        success: (result) => {
          console.log('获取的code',result)
          this.request({
            url:'/auth/wxLogin',
            data:{
              code:result.code
            },
            success: res =>{
              console.log(res,'res')
            }})
        },
        fail: (err) => {console.log(err);},
        complete: (res) => {},
      })
  }

  request(option = {
    showLoading:false
  }){
    //判断rul是否存在
    if(!option.url){
      return false
    }
    if(option.showLoding){
      this.showLoading();
    }
    //http://159.75.169.224:7300/pz/auth/wxLogin
    uni.request({
      url:this.baseUrl + option.url,
      data:option.data ? option.data : {},
        header:option.header ? option.header : {},
      method: option.method ? option.method : 'GET',
      success: (response) =>{
        uni.hideLoading()
        //后端返回数据异常
        if(response.data.code != 10000){
          //将失败的结果返回出去
          if(option.fail && typeof option.fail == 'function'){
            option.fail(response)
          }
        }else{
          //将成功结果返回
          if(option.success && typeof option.success == 'function'){
            option.success(response.data)
          }
        }
      },
      fail:response => {
        uni.hideLoading()
        console.log(response)
      }
    })
  }	
  //创建加载的loding效果
  showLoading(){
    const isShowLoading = uni.batchGetStorageSync('isShowLoading')
    if(isShowLoading){
      uni.hideLoading()
      uni.setStorageSync('isShowLoading',false)
    }
    uni.showLoading({
      title:'加载中...',
      complete:function(){
        uni.setStorageSync('isShowLoading',true)
      },
      fail:function(){
        uni.setStorageSync('isShowLoading',false)	
      }
    })
  }
}

export default new Utils();