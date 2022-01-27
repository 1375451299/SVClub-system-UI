<template>
    <div>

        <div class="container">
            <div class="handle-box">
                <el-select v-model="query.address" placeholder="产品名称" class="handle-select mr10">
                    <el-option key="1" label="广东省" value="广东省"></el-option>
                    <el-option key="2" label="湖南省" value="湖南省"></el-option>
                </el-select>
                <el-input v-model="query.name" placeholder="设备名称" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
       <el-table
              :data="tableData"
              border
              class="table"
              header-cell-class-name="table-header"
            >
       <el-table-column prop="time" label="时间"  align="center"></el-table-column>
                      <el-table-column prop="messageId" label="MessageId" align="center"></el-table-column>
                      <el-table-column prop="message" label="消息内容" align="center"></el-table-column>
                      <el-table-column prop="deviceName" label="设备名称" align="center"></el-table-column>
                        <el-table-column prop="messageType" label="内容类型" align="center"></el-table-column>
						<el-table-column label="操作" width="180" align="center">
						          <template #default="scope">
						              <el-button type="text"  class="red"
						                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
						          </template>
						      </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex"
                    :page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
            </div>
        </div>

        
    </div>
</template>

<script>import { fetchData } from "../api/log.js";
export default {
  data() {
    return {
    message:'first',
	pageTotal:0,
      createShow: false,
      query: {
        productName:'',
      },
      tableData: [],

    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      const para = this.query
      fetchData().then(response => {
        console.log(response)
        this.tableData = response.data
		this.pageTotal=response.data.length
      })
    },
	handlePageChange(val) {
	  this.query.pageIndex=val;
	  this.getData()
	},
	handleSearch() {
	},
  }
}
      
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
