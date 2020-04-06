<template>
  <div class="login">
    <el-dialog :visible.sync="dialogVisible" width="700px" :close-on-click-modal="false" :before-close="handleClose" :title="loginTitle" center>
      <el-tabs v-model="activeName" v-if="toLogin === 0" class="tab" >
        <el-tab-pane label="账号登录" name="first">
            <div class="play">
                <span>账号</span>
                <el-input v-model="loginName" placeholder="请输入您的手机号码或邮箱" width="50%"></el-input>
            </div>
            <div class="play">
                <span>密码</span>
                <el-input v-model="loginPassword" placeholder=" 请输入您的密码" show-password></el-input>
            </div>
            <div style="height:50px">
             <span class="register" @click="forgetPassword">忘记密码?</span>
             <!-- <span class="register" style="float:right;marginRight:120px"  @click="toRegister">还未注册？去注册</span> -->
            </div>
            <el-button type="warning" style="marginLeft:50px" @click="cusLogin">登录</el-button>
        </el-tab-pane>
        <el-tab-pane label="短信登录" name="second">
            <div class="play">
                <span>账号</span>
                <el-input placeholder="请输入您的手机号码或邮箱 "></el-input>
            </div>
            <div class="play" style="marginLeft:2px">
                <span>验证码</span>
                <el-input placeholder=" 请输入验证码"></el-input>
                <p class="getSms">获取验证码</p>
            </div>
            <el-button type="warning" style="marginLeft:50px">登录</el-button>
        </el-tab-pane>
      </el-tabs>
      <!-- <el-tabs v-model="activeName2" v-else-if="toLogin === 1">
          <el-tab-pane label="注册" name="third">
            <div class="play">
                <span>账号</span>
                <el-input v-model="registerPoster" placeholder="请输入您的手机号码或邮箱" width="50%"></el-input>
            </div>
            <div class="play">
                <span style="margin-left:-13px">用户名</span>
                <el-input
                 v-model="registerName"
                 placeholder="请输入您的用户名"
                 maxlength="10"
                 show-word-limit>
                </el-input>
            </div>
            <div class="play">
                <span>密码</span>
                <el-input v-model="registerPassWord" placeholder=" 请输入您的密码" show-password></el-input>
            </div>
            <div class="play">
                <span style="margin-left:-13px">验证码</span>
                <el-input  v-model="reSms" placeholder="请输入验证码"></el-input>
                <p class="getSms" @click="getreSms">获取验证码</p>
            </div>
          </el-tab-pane>
            <el-button type="warning" style="marginLeft:50px" @click="cusRegister">注册</el-button>
            <span @click="backLogin" style="marginLeft:15px;cursor:pointer">返回登录</span>
      </el-tabs> -->
      <el-tabs v-model="activeName3" v-else>
          <el-tab-pane label="忘记密码" name="four">
            <div class="play">
                <span>账号</span>
                <el-input v-model="newPoster" placeholder="请输入您的手机号码或邮箱" width="50%"></el-input>
            </div>
            <div class="play">
                <span style="margin-left:-13px">新密码</span>
                <el-input v-model="newPassword" placeholder="请输入您的新密码" width="50%" show-password></el-input>
            </div>
            <div class="play">
                <span style="margin-left:-13px">验证码</span>
                <el-input  v-model="foSms" placeholder="请输入验证码"></el-input>
                <p class="getSms" @click="getfoSms">获取验证码</p>
            </div>
            <el-button type="warning" style="marginLeft:50px" @click="modifyPsd">修改密码</el-button>
            <span @click="backLogin" style="marginLeft:15px;cursor:pointer">返回登录</span>
          </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import {adminLogin, getCode, changePsd} from '@/api/admin'
export default {
  name: 'login',
  props: ['visible'],
  data () {
    return {
      activeName: 'first',
      activeName2: 'third',
      activeName3: 'four',
      newPoster: '',
      newPassword: '',
      dialogVisible: false,
      loginName: '',
      loginPassword: '',
      registerPoster: '',
      registerName: '',
      registerPassWord: '',
      reSms: '', // 注册验证码
      toLogin: 0,
      isreSms: false, // 是否已点击获取验证码,注册
      foSms: '', // 忘记密码验证码
      isfoSms: false, // 是否已点击获取验证码,忘记密码
      loginTitle: '用户登录'
    }
  },
  watch: {
    visible: function (newval, oldval) {
      this.dialogVisible = this.visible
    },
    deep: true
  },
  mounted () {
    // this.verifyCode = new GVerify('v_container')
  },
  methods: {
    // 点击对话框关闭按钮
    handleClose () {
      this.dialogVisible = false
      this.$emit('changeLogin', this.dialogVisible)
    },
    // 点击登录
    cusLogin () {
      if (!this.loginName) {
        this.$message({
          message: '邮箱不能为空！',
          type: 'warning',
          center: true,
          duration: 1000
        })
      } else if (!this.loginPassword) {
        this.$message({
          message: '密码不能为空！',
          type: 'warning',
          center: true,
          duration: 1000
        })
      } else {
        let myReg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/
        if (myReg.test(this.loginName)) {
          let data = {mail: this.loginName, psd: this.loginPassword}
          adminLogin(data).then(res => {
            console.log(res)
            if (res.code === 14) {
              this.$message({
                message: '恭喜你，登录成功！',
                type: 'success',
                center: true,
                duration: 1000
              })
              this.$emit('logined', res.data.customerId)
              this.dialogVisible = false
              window.localStorage.setItem('accountId', res.data.adminId)
              window.localStorage.setItem('accountToken', res.data.token)
            } else {
              this.$message({
                message: res.msg,
                type: 'warning',
                center: true,
                duration: 1000
              })
            }
          }).catch(res => {
            console.log(res)
          })
        } else {
          this.$message({
            message: '您输入的邮箱格式有误，请重新输入！',
            type: 'warning',
            center: true,
            duration: 1000
          })
          return false
        }
      }
    },
    // 去忘记密码界面
    forgetPassword () {
      this.toLogin = 3
      this.loginName = ''
      this.loginPassword = ''
    },
    // 去注册界面
    toRegister () {
      this.toLogin = 1
      this.loginName = ''
      this.loginPassword = ''
      this.loginTitle = '用户注册'
    },
    // 回到登录界面
    backLogin () {
      this.toLogin = 0
      this.registerPoster = ''
      this.registerPassWord = ''
      this.reSms = ''
      this.registerName = ''
      this.newPoster = ''
      this.newPassword = ''
      this.loginTitle = '用户登录'
    },
    // 点击修改密码
    modifyPsd () {
      let data = {mail: this.newPoster, password: this.newPassword, code: this.foSms}
      changePsd(data).then(res => {
        console.log(res)
      }).catch(res => {
        console.log(res)
      })
    },
    // 获取忘记密码 验证码
    getfoSms () {
      let _email = this.newPoster
      if (!this.newPoster) {
        this.$message({
          message: '邮箱不能为空！',
          type: 'warning',
          center: true,
          duration: 1000
        })
      } else if (!this.newPassword) {
        this.$message({
          message: '新密码不能为空',
          type: 'warning',
          center: true,
          duration: 1000
        })
      } else {
        if (!this.isfoSms) {
          let myReg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/
          if (myReg.test(this.newPoster)) {
            getCode(_email).then(res => {
              console.log(res)
              if (res.code === 5) {
                this.isfoSms = true
                setTimeout(() => {
                  this.isfoSms = false
                }, 60000)
                this.$message({
                  message: '验证码已发送，请前往邮箱获取！',
                  type: 'success',
                  center: true,
                  duration: 1000
                })
              } else {
                this.$message({
                  message: '验证码发送失败',
                  type: 'warning',
                  center: true,
                  duration: 1000
                })
              }
            }).catch(res => {
              console.log(res)
            })
          } else {
            this.$message({
              message: '您输入的邮箱格式有误，请重新输入！',
              type: 'warning',
              center: true,
              duration: 1000
            })
            return false
          }
        } else {
          return false
        }
      }
    },
    // 获取注册 验证码
    getreSms () {
      let _email = this.registerPoster
      if (!this.registerPoster) {
        this.$message({
          message: '邮箱不能为空',
          type: 'warning',
          center: true,
          duration: 1000
        })
      } else if (!this.registerName) {
        this.$message({
          message: '用户名不能为空',
          type: 'warning',
          center: true,
          duration: 1000
        })
      } else if (!this.registerPassWord) {
        this.$message({
          message: '密码不能为空',
          type: 'warning',
          center: true,
          duration: 1000
        })
      } else {
        if (!this.isreSms) {
          let myReg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/
          if (myReg.test(this.registerPoster)) {
            getCode(_email).then(res => {
              console.log(res)
              if (res.code === 5) {
                this.isreSms = true
                setTimeout(() => {
                  this.isreSms = false
                }, 60000)
                this.$message({
                  message: '验证码已发送，请前往邮箱获取！',
                  type: 'success',
                  center: true,
                  duration: 1000
                })
              } else {
                this.$message({
                  message: '验证码发送失败',
                  type: 'warning',
                  center: true,
                  duration: 1000
                })
              }
            }).catch(res => {
              console.log(res)
            })
          } else {
            this.$message({
              message: '您输入的邮箱格式有误，请重新输入！',
              type: 'warning',
              center: true,
              duration: 1000
            })
            return false
          }
        } else {
          return false
        }
      }
    }
    // 点击注册
    // cusRegister () {
    //   if (!this.registerPoster) {
    //     this.$message({
    //       message: '邮箱不能为空',
    //       type: 'warning',
    //       center: true,
    //       duration: 1000
    //     })
    //   } else if (!this.registerName) {
    //     this.$message({
    //       message: '用户名不能为空',
    //       type: 'warning',
    //       center: true,
    //       duration: 1000
    //     })
    //   } else if (!this.registerPassWord) {
    //     this.$message({
    //       message: '密码不能为空',
    //       type: 'warning',
    //       center: true,
    //       duration: 1000
    //     })
    //   } else if (!this.reSms) {
    //     this.$message({
    //       message: '验证码不能为空',
    //       type: 'warning',
    //       center: true,
    //       duration: 1000
    //     })
    //   } else {
    //     let myReg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/
    //     if (myReg.test(this.registerPoster)) {
    //       let data = { mail: this.registerPoster, name: this.registerName, psd: this.registerPassWord, code: this.reSms }
    //       register(data).then(res => {
    //         console.log(res)
    //         if (res.code === 10) {
    //           this.$message({
    //             message: '恭喜你，注册成功啦！',
    //             type: 'success',
    //             center: true,
    //             duration: 1000
    //           })
    //           this.toLogin = 0
    //         } else {
    //           this.$message({
    //             message: res.msg,
    //             type: 'warning',
    //             center: true,
    //             duration: 1000
    //           })
    //         }
    //       })
    //     } else {
    //       this.$message({
    //         message: '您输入的邮箱格式有误，请重新输入！',
    //         type: 'warning',
    //         center: true,
    //         duration: 1000
    //       })
    //       return false
    //     }
    //   }
    // }
  }
}
</script>

<style scoped>
.login {
  background: #fff;
  margin: 0 auto;
  border-radius: 5px;
  margin-left: 20px;
  text-align: left;
}
.getSms{
  width: 80px;
  height: 25px;
  line-height: 25px;
  font-size: 14px;
  padding: 2px 3px;
  border-radius: 5px;
  background:lightgray;
  display: inline-block;
  text-align: center;
  cursor: pointer;
}
.getSms:active{
  transform: scale(1.1);
}
.el-input{
  width: 500px;
}
.register{
    float:left;
    cursor:pointer;
    margin-top: 10px;
    margin-left: 50px;
}
#v_container {
 width: auto;
 height: auto;
 display: inline-flex;
 position: relative;
 top: 1rem;
 margin-top: -2rem;
}
.play{
  margin-left: 15px;
  margin-bottom:10px;
}
</style>
