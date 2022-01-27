<template>
  <div>
    <el-dialog
      title="新增产品"
      v-model="show"
      :modal="false"
      :close-on-click-modal="false"
      :show-close="false"
      :close-on-press-escape="false"
    >
      <div class="container">
        <div class="form-box">
          <el-form ref="form" :rules="rules" :model="form" label-width="120px">
            <el-form-item label="产品名称" prop="productName">
              <el-input v-model="form.productName" placeholder="请输入产品名称" />
            </el-form-item>
            <el-form-item label="节点类型" prop="productType">
              <el-radio-group v-model="form.productType">
                <el-radio label="DIRECT">直连设备</el-radio>
                <el-radio label="SUB">网关子设备</el-radio>
                <el-radio label="GATEWAY">网关设备</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="产品描述" prop="productMessage">
              <el-input v-model="form.productMessage" placeholder="请输入产品描述" type="textarea" rows="5" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">确认</el-button>
              <el-button @click="cancel">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import { createProduct } from '../../../api/product'

export default {
  name: 'Baseform',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      protocols: [],
      form: {
        productName: '',
        productType: '',
        productMessage: '',
      },
      rules: {
        productName: [{ required: true, max: 60, message: '请输入产品名称', trigger: 'blur' }],
        productType: [{ required: true, message: '请选择节点类型', trigger: 'change' }],
        productMessage: [{ required: true, max: 160, message: '请输入产品描述', trigger: 'blur' }]
      }

    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
    },
    cancel() {
      this.$emit('hidden')
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (!valid) {
          this.$notify.error({
            title: '错误',
            message: '请检查必要参数'
          })
          console.log('error submit!!')
          return false
        }
        const para = this.form
        createProduct(para).then(data => {
          const retValue = data.data
          console.log(retValue)
          if(data.status==200)
          this.$message.success(data.msg)
          else this.$message.error(data.msg)
          /** 调用父组件绑定方法关闭dialog*/
          this.$emit('hidden')
          this.$emit('refresh')
          this.$refs['form'].resetFields()
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
