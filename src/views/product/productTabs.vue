<template>
    <div class="">
        <div class="container">
            <el-tabs v-model="message">
                <el-tab-pane :label="'产品信息'" name="first" :data="tableData" >
                  <el-descriptions direction="horizontal" :column="2" border>
                  <el-descriptions-item label="产品名称" align="center">{{tableData.productName}}</el-descriptions-item>
                    <el-descriptions-item label="节点类型" align="center">{{tableData.productType}}</el-descriptions-item>
                    <el-descriptions-item label="创建时间" align="center">{{tableData.createTime}}</el-descriptions-item>
                    <el-descriptions-item label="下行网络协议" align="center">MQTT</el-descriptions-item>
                      <el-descriptions-item label="数据协议" align="center">标准协议</el-descriptions-item>
                      <el-descriptions-item label="产品描述" align="center">{{tableData.productMessage}}</el-descriptions-item>
                  </el-descriptions>
                </el-tab-pane>
                
                
                <el-tab-pane :label="'物理模型'" name="second">
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
import { checkProduct } from "../../api/product.js";
export default {
  data() {
    return {
    message:'first',
      createShow: false,
      query: {
        productName:'',
      },
      tableData: [],
             topicData: [{
                  name: '属性上报',
                  topic: 'bcup/#{productKey}/prop',
                  desc: ''
                }, {
                  name: '事件上报',
                  topic: 'bcup/#{productKey}/event',
                  desc: ''
                }, {
                  name: '下行数据返回结果上报',
                  topic: 'bcup/#{productKey}/message/reply',
                  desc: '设备上报下行数据返回结果(服务&属性设置)'
                }, {
                  name: '设备属性设置',
                  topic: 'bcdown/#{productKey}/property/set',
                  desc: '设备属性设置'
                }]
    }
  },
  created() {
    console.log(this.$route.query)
    this.query.productName=this.$route.query.productName
    this.getData()
  },
  methods: {
    getData() {
      const para = this.query
      checkProduct(para).then(response => {
        console.log(response)
        this.tableData = response.data
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

