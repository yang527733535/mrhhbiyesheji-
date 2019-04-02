<template>
  <div>
    <section class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">👻小辉外卖</h2>
          <div class="login_header_title">
            <a href="javascript:;" @click="loginway=true" :class="{on:loginway}">短信登录</a>
            <a href="javascript:;" @click="loginway=false" :class="{on:!loginway}">密码登录</a>
          </div>
        </div>
        <div class="login_content">
          <form @submit.prevent="login">
            <div :class="{on:loginway}">
              <section class="login_message">
                <input type="tel" maxlength="11" v-model="phone" placeholder="手机号">
                <button
                  @click.prevent="getCode"
                  :disabled="!rightPhone"
                  class="get_verification"
                  :class="{right_phone: rightPhone}"
                >
                  <!-- {{computeTime>0 ? `已发送(${computeTime}s)` : '获取验证码'}}  -->
                  {{computeTime>0 ? `已发送(${computeTime}s)` : '获取验证码'}}
                </button>
              </section>
              <section class="login_verification">
                <input v-model="code" type="tel" maxlength="8" placeholder="验证码">
              </section>
              <section class="login_hint">
                温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
                <a href="javascript:;">《用户服务协议》</a>
              </section>
            </div>
            <div :class="{on:!loginway}">
              <section>
                <section class="login_message">
                  <input v-model="name" type="text" maxlength="11" placeholder="手机/邮箱/用户名">
                </section>
                <section class="login_verification">
                  <input type="text" maxlength="8" v-model="pwd" placeholder="密码" v-if="showPwd">
                  <input type="password" maxlength="8" v-model="pwd" placeholder="密码" v-else>
                  <div
                    @click="showPwd=!showPwd"
                    :class="showPwd?'on':'off'"
                    class="switch_button off"
                  >
                    <div class="switch_circle" :class="{right:showPwd}"></div>
                    <span class="switch_text">{{showPwd?'abc':"..."}}</span>
                  </div>
                </section>
                <section class="login_message">
                  <input type="text" v-model="captcha" maxlength="11" placeholder="验证码">
                  <img
                    ref="captcha"
                    class="get_verification"
                    @click="getCaptcha"
                    src="http://localhost:4000/captcha"
                    alt="captcha"
                  >
                </section>
              </section>
            </div>
            <button class="login_submit">登录</button>
          </form>
          <a href="javascript:;" class="about_us">关于我们</a>
        </div>
        <a @click="$router.back()" href="javascript:" class="go_back">
          <i class="iconfont icon-jiantou2"></i>
        </a>
      </div>
      <AlertTip @closeTip="closeTip" v-if="alertshow" :alertText="alertText"></AlertTip>
    </section>
  </div>
</template>

<script>
import { reqSendCode, reqSmsLogin, reqPwdLogin } from "../../api/";

import AlertTip from "../../components/AlertTip/AlertTip";
export default {
  components: {
    AlertTip
  },
  computed: {
    rightPhone() {
      return /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(
        this.phone
      );
    }
  },
  methods: {
    //获取一个新的图片验证码
    //每次指定的src要不一样
    getCaptcha() {
      this.$refs.captcha.src =
        "http://localhost:4000/captcha?time=" + Date.now();
    },
    //关闭警告框
    closeTip() {
      this.alertshow = false;
      this.alertText = "";
    },
    //异步获取短信验证码
    async getCode() {
      //启动倒计时
      //如果当前没有计时
      if (!this.computeTime) {
        this.computeTime = 30;
        this.interid = setInterval(() => {
          this.computeTime--;
          if (this.computeTime <= 0) {
            //停止计时
            clearInterval(interid);
          }
        }, 1000);
      }
      //发送ajax请求，向指定手机号发送验证码短信
      const result = await reqSendCode(this.phone);
      if (result.code == 1) {
        //显示提示
        this.showAlert(result.msg);
        //停止倒计时
        if (this.computeTime) {
          this.computeTime = 0;
          clearInterval(this.interid);
          this.interid = undefined;
        }
      }
    },
    //异步登录
    showAlert(alertText) {
      this.alertshow = true;
      this.alertText = alertText;
    },
    async login() {
      let result;
      //前台表单验证
      if (this.loginway) {
        //为真的话是短信登录 ，不然是密码登录
        const { rightPhone, phone, code } = this;
        if (!this.rightPhone) {
          //提示请输入正确的手机号码✔️
          this.showAlert("请输入正确的手机号码✔️");
          return;
        } else if (!/^\d{6}$/.test(code)) {
          //提示验证码错误
          this.showAlert("请输入正确的验证码✔️");
          return;
        }
        //发送ajax请求短信登录
        result = await reqSmsLogin(phone, code);
      } else {
        const { name, pwd, captcha } = this;
        if (!this.name) {
          //提示请输入正确的用户名✔️
          this.showAlert("请输入正确的用户名");
          return;
        } else if (!this.pwd) {
          //提示请输入正确的密码✔️
          this.showAlert("请输入正确的密码✔️");
          return;
        } else if (!this.captcha) {
          //提示请输入正确的验证码✔️
          this.showAlert("请输入正确的验证码✔️");
          return;
        }
        //发送ajax请求密码登录
        result = await reqPwdLogin({ name, pwd, captcha });
      }

      //停止计时
      if (this.computeTime) {
        this.computeTime = 0;
        clearInterval(this.interid);
        this.interid = undefined;
      }
      //根据结果数据处理
      if (result.code === 0) {
        const user = result.data;
        // 将user保存在vuex的state中
        this.$store.dispatch("recordUser", user);
        // 去个人中心界面
        this.$router.replace("/profile");
      } else {
        //显示新的验证码
        this.getCaptcha();
        //显示警告提示⚠️
        const msg = result.msg;
        this.showAlert(msg);
      }
    }
  },
  data() {
    return {
      name: "", //用户名
      captcha: "", //图形验证码
      code: "", //短讯验证码
      pwd: "",
      loginway: true, //true代表的是短信登录 false代表的是密码登录
      phone: "",
      showPwd: false, //是否显示密码
      computeTime: 0, //计时的时间
      alertText: "", //提示文本
      alertshow: false //是否显示提示框
    };
  }
};
</script>
@import "../../common/stylus/mixins.styl"
<style lang="stylus" scoped>
.loginContainer {
  width: 100%;
  height: 180px;
  background: #fff;

  .loginInner {
    padding-top: 60px;
    width: 80%;
    margin: 0 auto;

    .login_header {
      .login_logo {
        font-size: 40px;
        font-weight: bold;
        color: #02a774;
        text-align: center;
      }

      .login_header_title {
        padding-top: 40px;
        text-align: center;

        >a {
          color: #333;
          font-size: 14px;
          padding-bottom: 4px;

          &:first-child {
            margin-right: 40px;
          }

          &.on {
            color: #02a774;
            font-weight: 700;
            border-bottom: 2px solid #02a774;
          }
        }
      }
    }

    .login_content {
      >form {
        >div {
          display: none;

          &.on {
            display: block;
          }

          input {
            width: 100%;
            height: 100%;
            padding-left: 10px;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 4px;
            outline: 0;
            font: 400 14px Arial;

            &:focus {
              border: 1px solid #02a774;
            }
          }

          .login_message {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .get_verification {
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              border: 0;
              color: #ccc;
              font-size: 14px;
              background: transparent;

              &.right_phone {
                color: black;
              }
            }
          }

          .login_verification {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .switch_button {
              font-size: 12px;
              border: 1px solid #ddd;
              border-radius: 8px;
              transition: background-color 0.3s, border-color 0.3s;
              padding: 0 6px;
              width: 30px;
              height: 16px;
              line-height: 16px;
              color: #fff;
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);

              &.off {
                background: #fff;

                .switch_text {
                  float: right;
                  color: #ddd;
                }
              }

              &.on {
                background: #02a774;
              }

              >.switch_circle {
                // transform translateX(27px)
                position: absolute;
                top: -1px;
                left: -1px;
                width: 16px;
                height: 16px;
                border: 1px solid #ddd;
                border-radius: 50%;
                background: #fff;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                transition: transform 0.3s;

                &.right {
                  transform: translateX(16px);
                }
              }
            }
          }

          .login_hint {
            margin-top: 12px;
            color: #999;
            font-size: 14px;
            line-height: 20px;

            >a {
              color: #02a774;
            }
          }
        }

        .login_submit {
          display: block;
          width: 100%;
          height: 42px;
          margin-top: 30px;
          border-radius: 4px;
          background: #4cd96f;
          color: #fff;
          text-align: center;
          font-size: 16px;
          line-height: 42px;
          border: 0;
        }
      }

      .about_us {
        display: block;
        font-size: 12px;
        margin-top: 20px;
        text-align: center;
        color: #999;
      }
    }

    .go_back {
      position: absolute;
      top: 5px;
      left: 5px;
      width: 30px;
      height: 30px;

      >.iconfont {
        font-size: 20px;
        color: #999;
      }
    }
  }
}
</style>
