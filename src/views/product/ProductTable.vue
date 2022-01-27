 <template>
  <div>
    <router-view />
    <div class="container">
      <el-row :gutter="24" style="margin-top:5px; margin-bottom:5px">
        <el-col :span="24">
          <el-card shadow="always">
            <el-button
              type="primary"
              icon="el-icon-roundadd"
              class="handle-del mr10"
              @click="createProduct"
            >创建产品</el-button>
            <el-input v-model="input" placeholder="请输入产品名称" class="handle-input mr10" />
            <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
          </el-card>
        </el-col>
      </el-row>

      <el-table
        :data="tableData"
        border
        class="table"
        header-cell-class-name="table-header"
      >
 <el-table-column prop="productName" label="产品名称"  align="center"></el-table-column>
                <el-table-column prop="productKey" label="ProductKey" align="center"></el-table-column>
                <el-table-column prop="productType" label="节点类型" align="center"></el-table-column>
                <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
          <el-table-column label="操作" width="180" align="center">
                    <template #default="scope">
                        <el-button type="text" @click="viewDetail(scope.$index, scope.row)">查看
                        </el-button>
                        <el-button type="text" @click="goDevicePage(scope.$index, scope.row)">设备管理
                        </el-button>
                        <el-button type="text"  class="red"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="query.pageIndex"
          :page-size="query.pageSize"
          :total="total"
          @current-change="handlePageChange"
        />
      </div>
    </div>
    <product-create :show="createShow" @hidden="hiddenCreate" @refresh="getData" />
  </div>
</template>
<script>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { fetchData,deleteProduct,checkProduct } from "../../api/product.js";
import productCreate from '/src/views/product/component/create.vue'

export default {
 components: { productCreate },
  data() {
    return {
      createShow: false,
      query: {
        pageIndex: 1,
        pageSize: 10
      },
      tableData: [],
      total: 0,
      input:''
    }
  },
  created() {
    this.getData()
  },
  methods: {
    hiddenCreate() {
      this.createShow = false
    },
    createProduct() {
      this.createShow = true
    },
    getData() {
      const para = this.query
      fetchData(para).then(response => {
        console.log(response)
        this.tableData = response.data
        this.total = Number(response.msg)
      })
    },
    // 触发搜索按钮
    handleSearch() {
      console.log(this.input)
      const para ={
          productName:this.input
      }
      var table=[]
      checkProduct(para).then(response => {
        table.push(response.data)
        this.tableData=table
        this.total = response.data.length
      }) .catch(() => { this.total = 0, this.tableData=null})
    },
    // 删除操作
    handleDelete(index, row) {
      this.$confirm('确定要删除吗？', '提示', {
        type: 'warning'
      }).then(() => {
        var query = reactive({
            productKey:row.productKey
        });
        deleteProduct(query).then(response => {
          console.log(response)
          this.$message.success('删除成功')
          this.getData()
        })
      })
        .catch(() => {})
    },
    viewDetail(index, row) {
      this.$router.push({path:'/producttabs',query: {productName: row.productName}})
    },
 
    // 分页导航
    handlePageChange(val) {
      this.query.pageIndex=val;
      this.getData()
    },
    goDevicePage(index, row) {
        console.log(row.productKey)
      this.$router.push({ path:'/Devicetable', query: { productKey: row.productKey }})
    }
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
