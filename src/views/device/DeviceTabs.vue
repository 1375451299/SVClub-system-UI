<template>
    <div class="">
        <div class="container">
            <el-tabs v-model="message">
                <el-tab-pane :label="'设备信息'" name="first" :data="tableData" >
                  <el-descriptions direction="horizontal" :column="3" border>
                  <el-descriptions-item label="设备名称" align="center">{{tableData.deviceName}}</el-descriptions-item>
				  <el-descriptions-item label="产品编码" align="center">{{tableData.productKey}}</el-descriptions-item>
                    <el-descriptions-item label="节点类型" align="center">{{tableData.deviceType}}</el-descriptions-item>
                    <el-descriptions-item label="创建时间" align="center">{{tableData.createTime}}</el-descriptions-item>
                    <el-descriptions-item label="固件版本" align="center"></el-descriptions-item>
                      <el-descriptions-item label="当前状态" align="center">{{tableData.deviceStatus}}</el-descriptions-item>
                      <el-descriptions-item label="设备秘钥" align="center">{{secret}}
					     <el-button type="text" @click="showSecret">查看 </el-button>
					          <el-button type="text">
					            复制
					          </el-button>
					  </el-descriptions-item>
                  </el-descriptions>
                </el-tab-pane>
                
                
                <el-tab-pane :label="'物理模型数据'" name="second">
                </el-tab-pane>
                <el-tab-pane :label="'TOPIC'" name="third">
                     <el-table :data="topicData"  style="width: 100%">
                        <el-table-column prop="name" label="名称" align="center" ></el-table-column>
                        <el-table-column prop="topic" label="topic" align="center"></el-table-column>
                        <el-table-column prop="desc" label="描述" align="center"></el-table-column>
                      </el-table>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import { checkDevice } from "../../api/device.js";
export default {
  data() {
    return {
    message:'first',
      secret: '************',
      query: {
        productKey:'',
        deviceName:''
      },
	  productCode:'',
	  deviceCode:'',
      tableData: [],
             topicData: [
        { name: '↑属性上报', topic: 'bcup/' + this.productCode + '/' + this.deviceCode + '/prop', desc: '设备上报属性' },
        { name: '↑事件上报', topic: 'bcup/' + this.productCode + '/' + this.deviceCode + '/event', desc: '设备上报事件' },
        { name: '↑服务调用返回结果上报', topic: 'bcup/' + this.productCode + '/' + this.deviceCode + '/message/reply', desc: '设备上报服务调用结果' },
        { name: '↑设备属性读取响应', topic: 'bcup/' + this.productCode + '/' + this.deviceCode + '/property/getreply', desc: '系统读取设备属性后，设备向该topic发送数据响应' },
        { name: '↑设备升级状态响应', topic: 'bcup/' + this.productCode + '/' + this.deviceCode + '/upgrade/reply', desc: '设备升级状态响应' },
        { name: '↓调用设备服务', topic: 'bcdown/' + this.productCode + '/' + this.deviceCode + '/service/invoke', desc: '下行发送指令到设备' },
        { name: '↓设备属性设置', topic: 'bcdown/' + this.productCode + '/' + this.deviceCode + '/property/set', desc: '下行发送指令到设备' },
        { name: '↓设备属性读取', topic: 'bcdown/' + this.productCode + '/' + this.deviceCode + '/property/get', desc: '读取设备属性时向该topic发送消息' },
        { name: '↓下发升级指令', topic: 'bcdown/' + this.productCode + '/' + this.deviceCode + '/upgrade/set', desc: '下发升级指令' }
      ]
    }
  },
  created() {
    this.query.productKey=this.$route.query.productKey
    this.query.deviceName=this.$route.query.deviceName
	
	 const subTable = [
	            { name: '↑属性上报', topic: 'bcup/' + this.query.productKey + '/' + this.query.deviceName + '/prop', desc: '设备上报属性' },
	            { name: '↑事件上报', topic: 'bcup/' + this.query.productKey + '/' +  this.query.deviceName + '/event', desc: '设备上报事件' },
	            { name: '↑服务调用返回结果上报', topic: 'bcup/' + this.query.productKey + '/' +  this.query.deviceName+ '/message/reply', desc: '设备上报服务调用结果(设备属性设置也上报到这里)' },
	            { name: '↑设备属性读取响应', topic: 'bcup/' + this.query.productKey + '/' + this.query.deviceName + '/property/getreply', desc: '系统读取设备属性后，设备向该topic发送数据响应' },
	            { name: '↑设备升级状态响应', topic: 'bcdown/' + this.query.productKey + '/' +  this.query.deviceName + '/upgrade/reply', desc: '设备升级状态响应' },
	            { name: '↓调用设备服务', topic: 'bcdown/' + this.query.productKey + '/' +  this.query.deviceName + '/service/invoke', desc: '下行发送指令到设备' },
	            { name: '↓设备属性设置', topic: 'bcdown/' + this.query.productKey + '/' +  this.query.deviceName + '/property/set', desc: '下行发送指令到设备' },
	            { name: '↓设备属性读取', topic: 'bcdown/' + this.query.productKey + '/' +  this.query.deviceName + '/property/get', desc: '读取设备属性时向该topic发送消息' },
	            { name: '↓下发升级指令', topic: 'bcdown/' + this.query.productKey + '/' +  this.query.deviceName + '/upgrade/set', desc: '下发升级指令' }
	          
	          ]
	          this.topicData = subTable
    this.getData()
  },
  methods: {
    getData() {
      const para = this.query
      checkDevice(para).then(response => {
        this.tableData = response.data
      })
    },
	 showSecret() {
	      this.secret = this.tableData.deviceSecret
	    },
		  clipboardSuccess() {
		      this.$message({
		        message: '复制成功',
		        type: 'success',
		        duration: 1500
		      })
		    },
  }
}
</script>

<style>
.message-title {
    cursor: pointer;
}
.handle-row {
    margin-top: 30px;
}
</style>

