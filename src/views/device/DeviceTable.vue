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
              @click="createDevice"
            >创建设备</el-button>
            <el-input v-model="input" placeholder="请输入设备名称" class="handle-input mr10" />
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
 <el-table-column prop="productKey" label="产品编码"  align="center"></el-table-column>
                <el-table-column prop="deviceName" label="设备名称" align="center"></el-table-column>
                <el-table-column prop="deviceType" label="设备类型" align="center"></el-table-column>
                <el-table-column prop="deviceStatus" label="设备状态" align="center"></el-table-column>
                  <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
          <el-table-column label="操作" width="180" align="center">
                    <template #default="scope">
                        <el-button type="text" @click="viewDetail(scope.$index, scope.row)">查看
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
        <el-dialog title="创建设备" v-model="createShow" width="30%">
            <el-form
              ref="createForm"
              :rules="rules"
              :model="createForm"
              label-width="90px"
            >
              <el-form-item label="设备名称" prop="deviceName" label-width="90px">
                <el-input v-model="createForm.deviceName" />
              </el-form-item>
              <el-form-item label="所属产品" prop="productKey" label-width="90px">
                  <div v-if= "productKey==null">
                <el-select
                  v-model="createForm.productKey"
                  prop="productKey"
                  clearable
                  placeholder="请选择"
                  @change="$forceUpdate()"
                >
                  <el-option
                    v-for="item in productList"
                    :key="item.productKey"
                    :label="item.productName"
                    :value="item.productKey"
                  />
                </el-select>
                </div>
                <div v-else><el-input v-model="createForm.productKey" disabled /></div>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="hiddenCreate">取 消</el-button>
              <el-button type="primary" @click="saveCreate">确 定</el-button>
            </span>
          </el-dialog>
  </div>
</template>
<script>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { getDevices,deleteDevice,getProductDevices ,createDevice} from "../../api/device.js";
import { getAllProduct } from "../../api/product.js";

import productCreate from '/src/views/product/component/create.vue'

export default {
 components: { productCreate },
  data() {
    return {
      productKey:'',
      createShow: false,
      query: {
        pageIndex: 1,
        pageSize: 10
      },
      tableData: [],
      productList:[],
      total: 0,
      input:'',
      createForm: {},
       rules: {
              productKey: [
                { required: true, max: 60, message: "请选择产品", trigger: "blur" },
              ],
              deviceName: [
                {
                  required: true,
                  max: 60,
                  message: "请输入设备名称",
                  trigger: "blur",
                },
              ],

            },
    }
  },
  created() {
    this.productKey=this.$route.query.productKey
    this.createForm.productKey=this.productKey

      if(this.productKey==null){
              this.getData()
          getAllProduct().then(response => {
            this.productList = response.data
          })
      }

    else{
      this.getDatas()
    }
  },
  methods: {
    getAlldata(){
        if(this.productKey==null){
                  this.getData()
          }
        else{
          this.getDatas()
        }
    },
    hiddenCreate() {
      this.createShow = false
    },
    createDevice() {
      this.createShow = true
    },
    saveCreate(){
        createDevice( this.createForm).then(response => {
            this.getAlldata()
            this.createShow = false
            if(response.status==200)
             this.$message.success(response.msg)
             else   this.$message.error(response.msg)
        })
    },
    getData() {
      const para = this.query
      getDevices(para).then(response => {
        this.total = Number(response.msg)
        this.tableData = response.data
      })
    },
    getDatas() {
      const para = {
          productKey:this.productKey
      }
      getProductDevices(para).then(response => {
        this.total=response.data.length
        this.tableData = response.data
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
            deviceName:row.deviceName,
            productKey:row.productKey
        });
        deleteDevice(query).then(response => {
          console.log(response)
          if(response.status==200)
          this.$message.success(response.msg)
          else this.$message.error(response.msg)
        this.getAlldata()
        })
      })
        .catch(() => {})
    },
    viewDetail(index, row) {
      this.$router.push({path:'/devicetabs',query: {productKey: row.productKey,deviceName:row.deviceName}})
    },
 
    // 分页导航
    handlePageChange(val) {
      this.query.pageIndex=val;
      this.getData()
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
