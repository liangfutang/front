<template>
	<view>
    <view style="width: 100%; border-bottom: 0 none; position: fixed; z-index: 2">
      <view style="background: #ffffff; position: relative">
        <view class="h-tab vp-flex">
          <view :class="'h-tab-item vp-flex_1 ' + (filt == '' ? 'on' : '')" data-filt=""
              @tap="onFilterChange">全部</view>
          <view :class="'h-tab-item vp-flex_1 ' + (filt == 1 ? 'on' : '')" data-filt="1"
              @tap="onFilterChange">待支付</view>
          <view :class="'h-tab-item vp-flex_1 ' + (filt == 2 ? 'on' : '')" data-filt="2"
              @tap="onFilterChange">待服务</view>
          <view :class="'h-tab-item vp-flex_1 ' + (filt == 3 ? 'on' : '')" data-filt="3"
              @tap="onFilterChange">已完成</view>
          <view :class="'h-tab-item vp-flex_1 ' + (filt == 4 ? 'on' : '')" data-filt="4"
              @tap="onFilterChange">已取消</view>
        </view>
      </view>
    </view>
			
    <view style="height: 100rpx"></view>

    <block v-if="list != null">
      <view v-if="list != null && list.length == 0" style="padding: 40rpx 40rpx 40rpx 40rpx; text-align: center">
        <image src="/static/resource/images/empty.png" mode="widthFix" style="width: 200rpx" />
        <view class="f5">没有相关内容~</view>
      </view>
      <view v-else class="od-list">
        <block v-for="(item, index) in list" :key="index">
          <view class="od-item" @tap="toOrder" :data-id="item.out_trade_no">
            <view class="weui-cell weui-cell_access">
              <view class="weui-cell__hd">
                <view>
                  <image :src="item.service_logo_image_url" mode="widthFix" class="od-logo"
                      style="width: 100rpx; height: 100rpx; margin-right: 20rpx" />
                </view>
              </view>
              <view class="weui-cell__bd">
                <view>
                  <text style="font-weight: bold">{{ item.service_name }}</text>
                </view>
                <view class="od-info">
                  <block v-if="item.service_stype <= 20">
                    <view>
                        <text>{{ item.hospital_name }}（{{ item.area_name }}）</text>
                    </view>
                    <view>
                        预约时间：
                        <formater :timestamp="item.starttime" format="MM-dd hh:mm"></formater>
                    </view>
                    <view>
                        就诊人员：
                        <text>{{ item.client_name }}</text>
                    </view>
                  </block>
                  <block v-if="item.service_stype > 20 && item.service_stype < 100">
                    <view>
                      <text>{{ item.hospital_name }}（{{ item.area_name }}）</text>
                    </view>
                    <view>
                      处理时间：
                      <formater :timestamp="item.starttime" format="MM-dd hh:mm"></formater>
                    </view>
                  </block>
                  <block v-if="item.service_stype > 100">
                    <view>
                      服务时间：
                      <formater :timestamp="item.starttime" format="MM-dd hh:mm"></formater>
                    </view>
                    <view>
                      服务对象：
                      <text>{{ item.client_name }}</text>
                    </view>
                    <!-- <view>服务地址：<text>{{item.address.address}}</text> </view> -->
                  </block>
                </view>
              </view>
              <view class="weui-cell__ft">
                <!-- 待付款 -->
                <block v-if="item.trade_state == '待支付'">
                  <view style="color: #ffa200"><text>待支付</text></view>
                  <view style="color: #ffa200">
                      <counter style="font-size: 24rpx" :second="item._exp_time"
                          @counterOver="onCounterOver" />
                  </view>
                </block>
                <!-- 进行中 -->
                <block v-if="item.trade_state == '待服务'">
                  <view style="color: #1da6fd"><text>待服务</text></view>
                </block>
                <!-- 已完成 -->
                <block v-if="item.trade_state == '已完成'">
                  <view style="color: #21c521"><text>已完成</text></view>
                </block>
                <!-- 已取消 -->
                <block v-if="item.trade_state == '已取消'">
                  <view style="color: #999999"><text>已取消</text></view>
                </block>
              </view>
            </view>
          </view>
        </block>
      </view>
    </block>
			
	</view>
</template>

<script setup>
	import {ref ,reactive,computed, toRaw} from 'vue'
	import {onShow} from '@dcloudio/uni-app'
	const app = getApp()
	//记录当前的tab
	const filt = ref('')
	//订单列表数据
	const list = ref(null)
	
	onShow(()=>{
		filt.value = app.globalData.orders_filt
		loadList()
	})
	//订单状态筛选
	const onFilterChange = (e) =>{
		const {filt:curFilt} = e.currentTarget.dataset
		if(curFilt === filt.value) return
		filt.value = curFilt
		loadList()
	}
	
	//订单列表加载
	const loadList = () =>{
		app.globalData.utils.request({
			//调用订单列表
			url:'/order/list',
			method:'GET',
			data:{
				state:filt.value
			},
			header:{
				token:uni.getStorageSync('token')
			},
			success:res =>{
				console.log(res,'res')
				list.value = res.data
				console.log(list,'这是测试信息')
			},
			fail:res =>{
				uni.showToast({
					title:res.data.msg,
					icon:'none'
				})
			}
			
		})
	}
	//跳转订单详情页面
	const toOrder = (e) =>{
		uni.navigateTo({
			url:'../order/order?oid=' + e.currentTarget.dataset.id
		})
	}
	//倒计时结束后的回调函数
	const onCounterOver =() =>[
		loadList()
	]
</script>


<style>
@import './index.css'
</style>
