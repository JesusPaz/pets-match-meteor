<template>
  <v-content>
    <v-container fluid>
      <v-layout align-center justify-center style="margin-center;margin-left: 1%;">
        <v-flex xs12 sm8 md12>
          <v-card class="elevation-12" color="primary lighten-4" height="100%">
            <v-toolbar dark color="primary darken-1">
              <v-toolbar-title>{{chatName}}, Owner: {{otherUserChat}}</v-toolbar-title>
            </v-toolbar>
            <v-card-text style="height: 280px">
              <v-list ref="chat" id="logs" style="height: 240px;">
                <template v-for="(item, index) in logs">
                  <v-subheader v-if="item" :key="index">{{ item }}</v-subheader>
                </template>
              </v-list>
            </v-card-text>
            <v-card-actions>
              <v-form @submit.prevent="submit" style="width: 530px">
                <v-text-field v-model="msg" label="Message" single-line solo-inverted></v-text-field>
              </v-form>
              <v-spacer></v-spacer>
              <v-btn
                fab
                dark
                small
                color="primary"
                type="submit"
                style="float: right; margin-bottom: 5%; margin-right: 3%; "
              >
                <v-icon dark>send</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
const axios = require("axios");
export default {
  data() {
    return {
      otherUserChat: localStorage.getItem("id-user-chat"),
      userName: localStorage.getItem("user"),
      chatName: localStorage.getItem("pet-name-chat"),
      //logs es una lista con todos los mensajes a renderizar en el chat
      logs: [],
      //msg es el mensaje a enviar
      msg: null
    };
  },
  methods: {
    submit() {

      var msgSend = this.userName +": "+this.msg
      axios
        .post(
          "http://localhost:3000/api/chat/addmsg/" +
            this.userName +
            "/" +
            this.otherUserChat +
            "/" +
            msgSend
        )
        .then(response => {
          var rq = response.data;
          this.logs = rq;
        })
        .catch(error => {
          console.log(error);
        });
      this.msg = "";
    },
    loadChats() {
      axios
        .post(
          "http://localhost:3000/api/chat/" +
            this.userName +
            "/" +
            this.otherUserChat
        )
        .then(response => {
          var rq = response.data;
          this.logs = rq;
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },

  mounted() {
    this.otherUserChat = localStorage.getItem("id-user-chat");
    this.loadChats();
  },
  watch: {
    logs() {
      setTimeout(() => {
        this.$refs.chat.$el.scrollTop = this.$refs.chat.$el.scrollHeight;
      }, 0);
    }
  }
};
</script>

<style>
#logs {
  height: 100px;
  overflow: auto;
}
</style>