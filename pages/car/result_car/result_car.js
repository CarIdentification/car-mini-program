// pages/car/result_car/result_car.js
const util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    property:util.property,
    result:{},
    pics:[],
    salesmans:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that = this
    console.log(that.data.property)
    // that.setData({
    //   property:
    // })
    var id = options.id
    wx.request({
      url: 'http://localhost:8762/api-basicS/search/getCar',
      data:{id:id},
      success:function(res){
        var pics = new Array()
        for (var i = 0; i < res.data.entity.carPic.length; i++) {
          pics[i] = "../../../resource/image/car-pic/" + res.data.entity.carPic[i].imgSrc
        }
        console.log(pics)
        that.setData({
          result:res.data.entity,
          pics:pics
        })
        wx.request({
          url: 'http://localhost:8762/api-basicS/search/getSalesman',
          data:{brandId:res.data.entity.carBrand},
          success:function(e){
            that.setData({
              salesmans:e.data.entity
            })
          }
        })
        

      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  showPic:function(e){
    // console.log(e)
    var that = this
    wx.previewImage({
      current: e.currentTarget.dataset.src,// 当前显示图片的http链接
      urls: that.data.pics // 需要预览的图片http链接列表
    })
  }
})