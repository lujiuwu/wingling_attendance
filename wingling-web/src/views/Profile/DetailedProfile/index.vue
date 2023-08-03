<template>
  <div class="detailed_profile">
    <div class="title">个人信息</div>
    <div class="info_box">
      <div class="avatar_item">
        <div class="avatar_title">头像</div>
        <div class="fix_avatar">
          <wingling-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            name="avatar"
          >
            <img v-if="info.avatar" :src="info.avatar" class="avatar" />
            <i v-else class="el-icon-plus"></i>
          </wingling-upload>
          <i
            v-if="info.avatar"
            class="el-icon-arrow-right"
            @click="viewAvatar"
          ></i>
        </div>
        <div v-if="showAvatarModal" class="modal">
          <div class="modal-content">
            <span class="close" @click="closeAvatarModal">&times;</span>
            <img :src="info.avatar" class="avatar-big" />
          </div>
        </div>
      </div>
      <div class="name_box">
        <div class="name_title">姓名</div>
        <div class="name">{{ info.realname }}</div>
      </div>
      <div class="id_box">
        <div class="id_title">学号</div>
        <div class="id">{{ info.username }}</div>
      </div>
      <div class="grade_box">
        <div class="grade_title">年级</div>
        <div class="grade">{{ info.grade }}</div>
      </div>
      <div class="email_box">
        <div class="email_title">邮箱</div>
        <div class="email">{{ info.email }}</div>
      </div>
      <div class="team_box">
        <div class="team_title">团队</div>
        <div class="team">翼灵物联网工作室</div>
      </div>
      <div class="password_box">
        <div class="password_title">更改资料</div>
        <div class="password">
          <i class="el-icon-arrow-right" @click="updatedPassword"></i>
        </div>
        <div v-if="showPasswordModal" class="modal">
          <div class="modal-content">
            <span class="close" @click="closePasswordModal">&times;</span>
            <form @submit.prevent="onSubmit">
              <InputBox
                imgSrc="/assets/images/login/oldPassword.png"
                placeholder="旧密码"
                v-model="oldPassword"
                type="password"
                tips="请正确输入旧密码"
              />
              <InputBox
                imgSrc="/assets/images/login/newPassword.png"
                placeholder="新密码"
                v-model="newPassword"
                type="password"
                tips="请正确输入新密码"
              />
              <InputBox
                imgSrc="/assets/images/login/email.png"
                placeholder="新邮箱"
                v-model="newEmail"
                type="text"
                tips="请正确输入新邮箱"
              />
              <div class="form_footer">
                <button @click="cancel" class="btn cancel">取消</button>
                <button type="submit" class="btn">确定</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <button class="btn-logout" @click="logout">退出登录</button>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import InputBox from "@/components/InputBox/index.vue";
import { updateProfile } from "@/apis/profile/index";
import showNotice from "@/utils/notice";
export default {
  data() {
    return {
      newEmail: "",
      password: "",
      oldPassword: "",
      newPassword: "",
      showAvatarModal: false,
      showPasswordModal: false,
    };
  },
  components: {
    InputBox,
  },
  computed: {
    ...mapState("user", ["info"]),
    uploadUrl() {
      return `${process.env.VUE_APP_API_BASE_URL}/api/user/edit/${this.info._id}`;
    },
  },
  methods: {
    ...mapMutations("user", ["SET_AVATAR"]),
    handleAvatarSuccess(res) {
      this.SET_AVATAR(res.data.avatar);
    },
    viewAvatar() {
      this.showAvatarModal = true;
    },
    closeAvatarModal() {
      this.showAvatarModal = false;
    },
    updatedPassword() {
      this.newEmail = this.info.email;
      this.showPasswordModal = true;
    },
    closePasswordModal() {
      this.showPasswordModal = false;
      this.newPassword = "";
      this.oldPassword = "";
    },
    cancel() {
      this.showPasswordModal = false;
      this.newPassword = "";
      this.oldPassword = "";
    },
    async onSubmit() {
      if (this.$md5(this.oldPassword) !== this.info.password) {
        return showNotice("error", "旧密码输入错误");
      }
      if (
        !/^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(
          this.newEmail
        )
      ) {
        return showNotice("error", "邮箱格式不正确");
      }

      try {
        const params = {
          username: this.info.username,
          password: this.newPassword,
          grade: this.info.grade,
          email: this.newEmail,
        };
        await updateProfile(this.info._id, params);
        showNotice("success", "信息更新成功");
        this.cancel();
        localStorage.clear();
        this.$router.push("/login");
      } catch (err) {
        console.warn(err);
      }
    },
    async logout() {
      try {
        await this.$confirm("确认退出？", "提示");
        localStorage.clear();
        this.$router.push("/login");
        done();
      } catch (err) {
        console.warn(err);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.detailed_profile {
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
  padding: 5px;

  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    text-align: center;
    height: 40px;
    font-size: 18px;
    font-weight: bolder;
  }

  .info_box {
    display: flex;
    box-sizing: border-box;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    flex-direction: column;
    border-radius: 10px;
    background-color: #fff;
    margin-top: 5px;

    .avatar_item {
      height: 60px;
      padding: 10px;
      box-sizing: border-box;
      align-items: center;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ebeef5;

      .avatar_title {
        font-weight: bolder;
      }

      .fix_avatar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100%;

        .avatar-uploader {
          border-radius: 5px;
          width: 40px;
          height: 40px;
          margin-right: 5px;

          .avatar {
            border-radius: 5px;
            width: 40px;
            height: 40px;
          }
        }
      }

      .modal {
        display: block;
        position: fixed;
        z-index: 9999;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);

        .modal-content {
          width: 98%;
          display: block;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: #fff;
          padding: 25px;
          box-sizing: border-box;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

          .close {
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 20px;
            font-weight: bolder;
            cursor: default;
          }

          .avatar-big {
            max-width: 100%;
            max-height: 100%;
          }
        }
      }
    }

    .name_box {
      height: 60px;
      box-sizing: border-box;
      padding: 10px;
      align-items: center;
      background-color: #fff;
      display: flex;
      border-radius: 10px;
      justify-content: space-between;
      border-bottom: 1px solid #ebeef5;

      .name_title {
        font-weight: bolder;
      }

      .name {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        font-weight: bolder;
        color: #808080;
      }
    }
    .id_box {
      height: 60px;
      box-sizing: border-box;
      padding: 10px;
      align-items: center;
      background-color: #fff;
      display: flex;
      border-radius: 10px;
      justify-content: space-between;
      border-bottom: 1px solid #ebeef5;

      .id_title {
        font-weight: bolder;
      }

      .id {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        font-weight: bolder;
        color: #808080;
      }
    }
    .grade_box {
      height: 60px;
      box-sizing: border-box;
      padding: 10px;
      align-items: center;
      background-color: #fff;
      display: flex;
      border-radius: 10px;
      justify-content: space-between;
      border-bottom: 1px solid #ebeef5;

      .grade_title {
        font-weight: bolder;
      }

      .grade {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        font-weight: bolder;
        color: #808080;
      }
    }
    .email_box {
      height: 60px;
      box-sizing: border-box;
      padding: 10px;
      align-items: center;
      background-color: #fff;
      display: flex;
      border-radius: 10px;
      justify-content: space-between;
      border-bottom: 1px solid #ebeef5;

      .email_title {
        font-weight: bolder;
      }

      .email {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        font-weight: bolder;
        color: #808080;
      }
    }
    .team_box {
      height: 60px;
      box-sizing: border-box;
      padding: 10px;
      align-items: center;
      background-color: #fff;
      display: flex;
      border-radius: 10px;
      justify-content: space-between;
      border-bottom: 1px solid #ebeef5;

      .team_title {
        font-weight: bolder;
      }

      .team {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        font-weight: bolder;
        color: #808080;
      }
    }

    .password_box {
      height: 60px;
      box-sizing: border-box;
      padding: 10px;
      align-items: center;
      background-color: #fff;
      display: flex;
      border-radius: 10px;
      justify-content: space-between;
      border-bottom: 1px solid #ebeef5;

      .password_title {
        font-weight: bolder;
      }

      .password {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        font-weight: bolder;
        color: #808080;
      }

      .modal {
        display: block;
        position: fixed;
        z-index: 999;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);

        .modal-content {
          width: 98%;
          display: block;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: #fff;
          padding: 25px;
          box-sizing: border-box;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

          .close {
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 20px;
            font-weight: bolder;
            cursor: default;
          }

          form {
            .form_footer {
              display: flex;
              justify-content: flex-end;

              .cancel {
                margin-right: 10px;
              }

              .btn {
                height: 40px;
                width: 60px;
                background-color: #fff;
                border-radius: 10px;
                border: none;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
                transition: transform 0.2s;
                font-weight: bolder;
                color: #808080;
                font-size: 16px;

                &:active {
                  transform: translateY(2px);
                  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
                  font-size: 15px;
                }
              }
            }
          }
        }
      }
    }
  }

  .btn-logout {
    position: relative;
    display: block;
    margin: 40px auto;
    width: 90%;
    padding: 20px;
    border: none;
    border-radius: 50px;
    background: linear-gradient(to bottom, #f44336, #d32f2f);
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    letter-spacing: 2px;
    box-shadow: 20px 20px 30px rgba(0, 0, 0, 0.2) -20px -20px 30px
      rgba(230, 58, 51, 1);
    transition: all 0.3 ease-out;

    &:active {
      transform: translateY(1px);
      box-shadow: 0 0 0 rgba(0, 0, 0, 0.2), 0 0 0 rgba(230, 58, 51, 0.8),
        inset 10px 10px 20px rgba(0, 0, 0, 0.1),
        inset -10px -10px 20px rgba(230, 58, 51, 1);
      font-size: 17px;
    }
  }
}
</style>