<template>
  <uni-popup type="bottom" ref="uniPopup">
    <view class="pick-box">
      <view class="box-top">
        <view class="top-left" @click="onCancel()">
          取消
          <!--   取消 select{{selectValue}} -->
        </view>
        <view class="top-right" @click="onConfirm()">
          <!--          确定 begin{{beginTime}} -->
          确定
        </view>
      </view>
      <view class="box-content">
        <picker-view :value="initValue" @change="pickerChange" class="picker-view" :indicator-style="indicatorStyle"
          @tap.stop="()=>{return}">
          <picker-view-column>
            <view class="picker-item" v-for="(item, index) in years" :key="index">{{item}}年</view>
          </picker-view-column>
          <picker-view-column>
            <view class="picker-item" v-for="(item, index) in months" :key="index">{{ item }}月</view>
          </picker-view-column>
          <picker-view-column v-if="days.length > 0">
            <view class="picker-item" v-for="(item, index) in days" :key="index">{{ item }}日</view>
          </picker-view-column>
        </picker-view>
      </view>
    </view>
  </uni-popup>
</template>

<script>
export default {
  data() {
    return {
      initValue: [0, 0, 0],
      selectValue: [0, 0, 0],
      // currentTime: new Date()
    }
  },
  props: {
    beginTime: {
      type: Array,
      default: () => {
        const now = new Date()
        return [now.getFullYear(), now.getMonth(), now.getDate()]
      }
    }
  },
  computed: {
    indicatorStyle() {
      return 'height: 88rpx;'
    },
    years() {
      const yearArray = []
      for (let i = 0; i < 5; i++) {
        yearArray.push(this.beginTime[0] + i)
      }
      return yearArray
    },
    months() {
      const monthArray = []
      // 当前选择年份 和 开始年份相等 进行月份限制
      if (this.beginTime[0] === this.years[this.selectValue[0]]) {
        console.log('this.beginTime[1]:', this.beginTime[1])
        for (let i = this.beginTime[1] + 1; i <= 12; i++) {
          monthArray.push(i)
        }
      } else {
        for (let i = 1; i <= 12; i++) {
          monthArray.push(i)
        }
      }
      return monthArray
    },
    days() {
      const dayArray = []
      const allDay = new Date(this.beginTime[0] + this.selectValue[0], this.selectValue[1] + 1, 0)
      // 年份和 月份 都和起始时间相等  对天数进行限制
      if (this.beginTime[0] === this.years[this.selectValue[0]] && this.beginTime[1] + 1 === this.months[this.selectValue[
        1]]) {
        for (let i = this.beginTime[2]; i <= allDay.getDate(); i++) {
          dayArray.push(i)
        }
      } else {
        for (let i = 1; i <= allDay.getDate(); i++) {
          dayArray.push(i)
        }
      }

      return dayArray
    }
  },
  methods: {
    onOpen() {
      this.$refs.uniPopup.open()
    },
    pickerChange(e) {
      this.selectValue = e.detail.value
    },
    onCancel() {
      this.$refs.uniPopup.close()
    },
    onConfirm() {
      const date = [this.years[this.selectValue[0]], this.months[this.selectValue[1]], this.days[this.selectValue[2]]]
      // console.log("-----onConfirm:", date)
      this.$emit('onDateConfirm', date)
      this.$refs.uniPopup.close()
    }
  }
}
</script>

<style lang="scss" scoped>
  .pick-box {
    width: 100%;
    height: 600rpx;
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;

    .box-top {
      display: flex;
      height: 70rpx;
      justify-content: space-between;
      flex-direction: row;
      // background-color: #007AFF;

      .top-left {
        padding-left: 20rpx;
        font-size: 35rpx;
        line-height: 70rpx;
        color: #888888;
      }

      .top-right {
        font-size: 35rpx;
        line-height: 70rpx;
        padding-right: 20rpx;
        color: #007AFF;
      }
    }

    .box-content {
      flex: 1;
      // background-color: #007AFF;
      padding-top: 30rpx;
      padding-bottom: 10rpx;

      .picker-view {
        width: 100%;
        height: 100%;
        background-color: #FFFFFF;

        .picker-item {
          font-size: 32rpx;
          height: 88rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
      }
    }

  }
</style>
